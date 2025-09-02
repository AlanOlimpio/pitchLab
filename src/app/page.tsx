"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const socket = io("http://localhost:4000");

type Message = { user: string; message: string; time: string };

export default function HomePage() {
  const [rooms, setRooms] = useState<string[]>([]);
  const [roomName, setRoomName] = useState("");
  const [joinedRoom, setJoinedRoom] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("rooms_list", (list) => setRooms(list));

    if (isNameSet) {
      socket.emit("get_rooms", (list: string[]) => {
        setRooms(list);
      });
    }

    socket.on("receive_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("rooms_list");
      socket.off("receive_message");
    };
  }, [isNameSet]);

  function createRoom() {
    if (!roomName) return;
    socket.emit("create_room", roomName, (res: any) => {
      if (res.success) setRoomName("");
    });
  }

  function joinRoom(name: string) {
    socket.emit("join_room", name, username, (res: any) => {
      if (res.success) {
        setJoinedRoom(name);
        setMessages(res.history);
      }
    });
  }

  function sendMessage() {
    if (!message || !joinedRoom) return;
    socket.emit("send_message", {
      roomName: joinedRoom,
      user: username,
      message,
    });
    setMessage("");
  }

  if (!isNameSet) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Escolha seu nome</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Digite seu nome..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                className="cursor-pointer"
                onClick={() => {
                  if (username.trim()) setIsNameSet(true);
                }}
              >
                Entrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  if (!joinedRoom) {
    return (
      <div className="p-6 max-w-lg mx-auto">
        <Card>
          <CardHeader>
            {rooms.length === 0 ? (
              <CardTitle>Nenhuma sala disponível. Crie uma!</CardTitle>
            ) : (
              <CardTitle>Salas disponíveis</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {rooms.map((room) => (
                <li
                  key={room}
                  className="flex items-center justify-between border rounded-md p-2"
                >
                  <span>{room}</span>
                  <Button
                    className="cursor-pointer"
                    size="sm"
                    onClick={() => joinRoom(room)}
                  >
                    Entrar
                  </Button>
                </li>
              ))}
            </ul>

            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Nome da sala"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <Button className="cursor-pointer" onClick={createRoom}>
                Criar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Sala: {joinedRoom}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64 border rounded-md p-2 mb-4">
            {messages.map((m, i) => (
              <div key={i} className="mb-2">
                <span className="font-semibold">{m.user}</span>: {m.message}
              </div>
            ))}
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <Button className="cursor-pointer" onClick={sendMessage}>
              Enviar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
