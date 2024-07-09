"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  fetchUserTokenById,
  generateChatResponse,
  substractUserTokens,
} from "../utils/utils.actions";
import toast from "react-hot-toast";
import Image from "next/image.js";
import { useAuth } from "@clerk/nextjs";

const Chat = ({ userData }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { userId } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: async (query) => {
      const currentTokens = await fetchUserTokenById(userId);
      if (currentTokens < 100) {
        toast.error("Token balance too low...🤖");
        return;
      }

      const response = await generateChatResponse([...messages, query]);
      if (!response) {
        toast.error("We couldn't answer to your query!🤖");
        return;
      }
      setMessages((prev) => [...prev, response.message]);
      const newTokens = await substractUserTokens(userId, response.tokens);
      toast.success(`${newTokens} tokens remaining...🤖`);
    },

    // mutationFn: (query) => generateChatResponse([...messages, query]),
    // onSuccess: (data) => {
    //   if (!data) {
    //     toast.error("We couldn't answer to your query! 🤖");
    //     return;
    //   }
    //   setMessages((prev) => [...prev, data]);
    // },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { role: "user", content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  let messageId = crypto.randomUUID();

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, messageId) => (
          <>
            <div className="chat chat-start" key={messageId}>
              <div className="chat-image avatar mb-8">
                <div className="w-10 rounded-full border-2">
                  <Image
                    alt={role === "user" ? "You" : "Brainiac"}
                    src={
                      role === "user"
                        ? `${userData.imageUrl}`
                        : "/images/brainiac.png"
                    }
                    width={80}
                    height={80}
                    title={role === "user" ? "You" : "Brainiac"}
                  />
                </div>
              </div>
              <div className="chat-header font-semibold pb-2">
                {role === "user"
                  ? `${userData.firstName} ${userData.lastName}`
                  : "Brainiac"}{" "}
              </div>
              <div className="chat-bubble bg-slate-50 mb-8 text-black">
                {content}
              </div>
            </div>
          </>
        ))}
        {isPending ? (
          <div className="max-w-screen-lg flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
          </div>
        ) : null}
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Query..."
            className="input input-bordered join-item w-full"
            value={text.toLowerCase()}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="btn btn-primary join-item rounded-r-lg"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "querying..." : "ask question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
