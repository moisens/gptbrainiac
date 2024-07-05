"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { generateChatResponse } from "../utils/utils.actions";
import toast from "react-hot-toast";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate } = useMutation({
    mutationFn: (query) => generateChatResponse([...messages, query]),
    onSuccess: (data) => {
      if (!data) {
        toast.error("brainiac couldn't answer your query! 🫤");
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };
  console.log("messages: ", messages);

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto] bg-red-300">
      <div className="bg-blue-400">
        <h2 className="text-5xl">messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12 bg-green-100">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Query..."
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="btn btn-primary join-item rounded-r-lg"
            type="submit"
          >
            ask question
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
