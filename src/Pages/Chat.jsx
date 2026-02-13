import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Send,
  Search,
  Plus,
  Phone,
  Video,
  MoreVertical,
  User,
  Clock,
  Check,
  CheckCheck,
  X,
} from "lucide-react";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Load conversations from localStorage
  const loadConversations = useCallback(() => {
    const saved = localStorage.getItem("conversations");
    const version = localStorage.getItem("chatVersion");
    // Clear old data and reinitialize if version doesn't match
    if (version !== "v2" || !saved) {
      initializeDefaultConversations();
    } else {
      try {
        setConversations(JSON.parse(saved));
      } catch {
        initializeDefaultConversations();
      }
    }
  }, []);

  useEffect(() => {
    loadConversations();
    setLoading(false);
  }, [loadConversations]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const initializeDefaultConversations = () => {
    const defaultConvos = [
      {
        id: 1,
        name: "Support Team",
        avatar: "👨‍💼",
        lastMessage: "How can we help you today?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        unread: 2,
        online: true,
        messages: [
          {
            id: 1,
            sender: "support",
            text: "Hello! Welcome to ABike Chops",
            timestamp: new Date(Date.now() - 7200000).toISOString(),
            status: "read",
          },
          {
            id: 2,
            sender: "me",
            text: "Hi, I have a question about the training classes",
            timestamp: new Date(Date.now() - 3900000).toISOString(),
            status: "read",
          },
          {
            id: 3,
            sender: "support",
            text: "How can we help you today?",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
            status: "delivered",
          },
        ],
      },
      {
        id: 2,
        name: "Instructor Damilola",
        avatar: "👨‍🏫",
        lastMessage: "See you in the next class!",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        unread: 0,
        online: false,
        messages: [
          {
            id: 1,
            sender: "instructor",
            text: "Good morning! Ready for today's class?",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            status: "read",
          },
          {
            id: 2,
            sender: "me",
            text: "Yes! Looking forward to it",
            timestamp: new Date(Date.now() - 86200000).toISOString(),
            status: "read",
          },
          {
            id: 3,
            sender: "instructor",
            text: "See you in the next class!",
            timestamp: new Date(Date.now() - 86000000).toISOString(),
            status: "read",
          },
        ],
      },
      {
        id: 3,
        name: "Orders Support",
        avatar: "📦",
        lastMessage: "Your order has been processed",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        unread: 0,
        online: true,
        messages: [
          {
            id: 1,
            sender: "orders",
            text: "Thank you for your order!",
            timestamp: new Date(Date.now() - 172800000).toISOString(),
            status: "read",
          },
          {
            id: 2,
            sender: "orders",
            text: "Your order has been processed",
            timestamp: new Date(Date.now() - 172700000).toISOString(),
            status: "read",
          },
        ],
      },
    ];
    setConversations(defaultConvos);
    localStorage.setItem("conversations", JSON.stringify(defaultConvos));
    localStorage.setItem("chatVersion", "v2");
  };

  const handleSelectConversation = (convo) => {
    setSelectedConversation(convo);
    setMessages(convo.messages || []);
    // Mark as read
    const updatedConvos = conversations.map((c) =>
      c.id === convo.id ? { ...c, unread: 0 } : c,
    );
    setConversations(updatedConvos);
    localStorage.setItem("conversations", JSON.stringify(updatedConvos));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message = {
      id: Date.now(),
      sender: "me",
      text: newMessage,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setNewMessage("");

    // Update conversations
    const updatedConvos = conversations.map((c) =>
      c.id === selectedConversation.id
        ? {
            ...c,
            lastMessage: newMessage,
            timestamp: new Date().toISOString(),
            messages: updatedMessages,
          }
        : c,
    );

    setConversations(updatedConvos);
    setSelectedConversation({
      ...selectedConversation,
      messages: updatedMessages,
    });
    localStorage.setItem("conversations", JSON.stringify(updatedConvos));

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const replies = [
        "Thanks for the message!",
        "I'll get back to you shortly.",
        "Got it, thanks for letting me know.",
        "That sounds great!",
        "Looking forward to it.",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const replyMessage = {
        id: Date.now() + 1,
        sender: selectedConversation.name.toLowerCase().replace(" ", ""),
        text: randomReply,
        timestamp: new Date().toISOString(),
        status: "read",
      };

      const updatedMessagesWithReply = [...updatedMessages, replyMessage];
      setMessages(updatedMessagesWithReply);

      const finalConvos = conversations.map((c) =>
        c.id === selectedConversation.id
          ? {
              ...c,
              lastMessage: randomReply,
              timestamp: new Date().toISOString(),
              messages: updatedMessagesWithReply,
            }
          : c,
      );

      setConversations(finalConvos);
      localStorage.setItem("conversations", JSON.stringify(finalConvos));
    }, 2000);
  };

  const handleCreateNewChat = () => {
    if (!newChatName.trim()) return;

    const newConvo = {
      id: Date.now(),
      name: newChatName,
      avatar: "👤",
      lastMessage: "No messages yet",
      timestamp: new Date().toISOString(),
      unread: 0,
      online: Math.random() > 0.5,
      messages: [],
    };

    const updatedConvos = [newConvo, ...conversations];
    setConversations(updatedConvos);
    localStorage.setItem("conversations", JSON.stringify(updatedConvos));
    setNewChatName("");
    setShowNewChat(false);
    handleSelectConversation(newConvo);
  };

  const filteredConversations = conversations.filter((convo) =>
    convo.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-black">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-full md:w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-black mb-4">Messages</h1>

          {/* Search */}
          <div className="relative flex items-center">
            <Search size={18} className="absolute left-3 text-black" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-purple-600 rounded-lg focus:outline-none 
              focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => setShowNewChat(true)}
            className="mt-3 w-full flex items-center justify-center gap-2
             bg-blue-500 hover:bg-blue-600 text-white font-semibold 
             py-2 px-4 rounded-lg transition"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => handleSelectConversation(convo)}
                className={`w-full p-4 border-b border-gray-100
                   hover:bg-gray-50 transition text-left ${
                     selectedConversation?.id === convo.id
                       ? "bg-blue-50 border-l-4 border-l-blue-500"
                       : ""
                   }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="relative">
                      <span className="text-2xl">{convo.avatar}</span>
                      {convo.online && (
                        <div
                          className="absolute bottom-0 right-0 w-3 h-3
                         bg-green-500 rounded-full border-2 border-white"
                        ></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-black truncate">
                        {convo.name}
                      </h3>
                      <p className="text-sm text-black truncate">
                        {convo.lastMessage}
                      </p>
                    </div>
                  </div>
                  {convo.unread > 0 && (
                    <span
                      className="bg-blue-500 text-white 
                    text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                    >
                      {convo.unread}
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 ml-11">
                  {formatTime(convo.timestamp)}
                </div>
              </button>
            ))
          ) : (
            <div className="p-8 text-center text-gray-600">
              <p>No conversations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex flex-1 flex-col bg-white">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedConversation.avatar}</span>
                <div>
                  <h2 className="font-bold text-gray-900">
                    {selectedConversation.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedConversation.online ? (
                      <span className="text-green-600">Active now</span>
                    ) : (
                      <span className="text-gray-400">Offline</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Phone size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        msg.sender === "me"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-300 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p className="break-words">{msg.text}</p>
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                          msg.sender === "me"
                            ? "text-blue-100"
                            : "text-gray-600"
                        }`}
                      >
                        <span>{formatTime(msg.timestamp)}</span>
                        {msg.sender === "me" && (
                          <>
                            {msg.status === "sent" && <Check size={14} />}
                            {msg.status === "delivered" && (
                              <CheckCheck size={14} />
                            )}
                            {msg.status === "read" && (
                              <CheckCheck size={14} className="text-blue-200" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600">
                  <p>No messages yet. Start the conversation!</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  className="flex-1 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <User size={48} className="mx-auto text-gray-400 mb-4" />
              <p>Select a conversation to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* New Chat Modal */}
      {showNewChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Start New Chat
              </h2>
              <button
                onClick={() => setShowNewChat(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>
            </div>

            <input
              type="text"
              placeholder="Enter contact name..."
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") handleCreateNewChat();
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              autoFocus
            />

            <div className="flex gap-3">
              <button
                onClick={() => setShowNewChat(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewChat}
                disabled={!newChatName.trim()}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
