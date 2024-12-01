"use client";
import { MovieProps } from "@/utils/types";
import { useParams } from "next/navigation";
import { useState } from "react";

const page = () => {
  const params = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  return <div>{params.id}</div>;
};

export default page;
