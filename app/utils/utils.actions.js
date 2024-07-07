"use server";

import OpenAI from "openai";
import prisma from "./db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an aswame assistant" },
        ...chatMessages,
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    //console.log(response.choices[0].message);
    //console.log(response);

    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};

export const generateTourResponse = async ({ city, country }) => {
  const query = `Find the exact ${city} in this exact ${country}.
If ${city} and ${country} exist, create a list of things families or friends can do in this ${city},${country}.
If ${city} is located in north America, ${country} is equal to USA or Canada. 
Once you have a list, create a one-day tour. Response should be  in the following JSON format: 
 
{
  "tour": {
    "city": "${city}",
    "country": "${country}",
    "title": "title of the tour",
    "description": "short description of the city and tour",
    "stops": ["short paragraph on the stop 1", "short paragraph on the stop 2","short paragraph on the stop 3"]
  }
}
 
"stops" property should include only three stops.
"title" try to diversify the titles. Not always the same title.
If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country}, return { "tour": null }, with no additional characters. Be careful with typos inside the JSON structure like extra commas after arrays last item, this info will be parsed with a JSON.parse() method.`;

  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a tour guide" },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });

    const tourData = JSON.parse(response.choices[0].message.content);
    //console.log(tourData);

    if (!tourData) return null;
    return tourData.tour;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getExistingTour = async ({ city, country }) => {
  return prisma.tour.findUnique({
    where: {
      city_country: {
        city,
        country,
      },
    },
  });
};

export const createNewTour = async (tour) => {
  return prisma.tour.create({
    data: tour,
  });
};

export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    const tours = await prisma.tour.findMany({
      orderBy: {
        city: "desc",
      },
    });
    return tours;
  }

  const tours = await prisma.tour.findMany({
    where: {
      OR: [
        {
          city: { contains: searchTerm },
        },
        {
          country: { contains: searchTerm },
        },
      ],
    },
    orderBy: {
      city: "desc",
    },
  });
  return tours;
};
