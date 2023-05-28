import { defineStore } from "pinia";
import { ref } from "vue";

interface Chat {
  id: string;
  name: string;
  lastOnline: Date;
  image: string;
  messages: Message[];
}

interface Message {
  id: string;
  from: string;
  text: string;
  sentDate: Date;
  liked?: Boolean;
}

export const useChatStore = defineStore("chat-store", () => {
  const chatList = ref<Chat[]>([
    {
      id: "45f7e362-fd49-11ed-be56-0242ac120002",
      name: "Andrew Tate",
      lastOnline: new Date("2023-05-27T23:50:00"),
      image:
        "https://video-images.vice.com/articles/63b2ba3d1992fc4d9a2012d2/social_lede/1672919373598-andrew-tate.jpeg?crop=0.5590277777777778xw:1xh;center,center",
      messages: [
        {
          id: "89756743",
          from: "Andrew Tate",
          text: "Matrix is all around us, stay alerted!",
          sentDate: new Date("2023-05-26T23:45:00"),
        },
        {
          id: "89356741",
          from: "Sardor Aminov",
          text: "Okay bro, got you!",
          sentDate: new Date("2023-05-26T23:46:00"),
        },
      ],
    },
    {
      id: "978c58de-fd49-11ed-be56-0242ac120002",
      name: "Elon Musk",
      lastOnline: new Date("2023-05-27T20:30:00"),
      image:
        "https://assets.website-files.com/6255afae011f05232dbd680b/625d975369b5b7dcef69a085_Untitled%20design%20-%202022-04-18T095219.099.png",
      messages: [
        {
          id: "89756449",
          from: "Sardor Aminov",
          text: "Bro, when are you going to your Mars?",
          sentDate: new Date("2023-05-26T19:55:00"),
        },
        {
          id: "13756743",
          from: "Elon Musk",
          text: "When the race of humanity is about to come to its end!",
          sentDate: new Date("2023-05-26T20:00:00"),
        },
      ],
    },
  ]);

  const getChat = (id: string) => {
    return chatList.value.find((ch) => {
      return ch.id === id;
    });
  };

  const addMessage = (chatId: string, from: string, text: string) => {
    if (text.length >= 1024) {
      alert("The length of message must be lower than 1024");
      return;
    }

    const chat = chatList.value.find((ch) => ch.id === chatId);

    const date = new Date(Date.now());

    if (chat) {
      chat.messages.push({
        id: generateRandomId(),
        from,
        text,
        sentDate: date,
      });
    }
  };

  const generateRandomId = (): string => {
    return Math.floor(Math.random() * 99999999).toString();
  };

  const deleteMessage = (chatId: string, messageId: string) => {
    const chat = chatList.value.find((ch) => ch.id === chatId);

    if (chat) {
      chat.messages = chat.messages.filter((ch) => {
        return ch.id !== messageId;
      });

      return;
    }
  };

  const likeMessage = (chatId: string, messageId: string) => {
    const chat = chatList.value.find((ch) => ch.id === chatId);

    if (chat) {
      const message = chat.messages.find((m) => m.id === messageId);

      if (message) {
        message.liked = message.liked ? false : true;
        return;
      }
    }
  };

  return {
    deleteMessage,
    addMessage,
    chatList,
    getChat,
    likeMessage,
  };
});
