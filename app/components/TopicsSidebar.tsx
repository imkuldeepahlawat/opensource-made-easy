"use client";

import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

interface Topic {
  name: string;
  display_name: string;
  short_description: string;
  created_at: string;
  description: string;
  created_by: string;
  updated_at: string;
  featured: boolean;
  curated: boolean;
  score: number;
}

interface GitHubResponse {
  items: Topic[];
}

export default function TopicsSidebar() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topics");
        const data = (await response.json()) as GitHubResponse[];

        // Get all unique topics and double them for infinite scroll
        const uniqueTopics = data
          .flatMap((d) => d.items || [])
          .filter(
            (topic: Topic, index: number, self: Topic[]) =>
              index === self.findIndex((t: Topic) => t.name === topic.name),
          );

        // Double the array and shuffle both halves
        const doubledTopics = [...uniqueTopics, ...uniqueTopics];
        setTopics(doubledTopics);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    if (!topics.length) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        // Reset to first half when reaching the middle
        if (next >= topics.length / 2) return 0;
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [topics.length]);

  return (
    <div className="w-80 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 p-4 overflow-hidden h-[600px]">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FaGithub className="w-5 h-5" />
        Trending Topics
      </h2>

      <div
        className="space-y-4 transition-transform duration-500"
        style={{ transform: `translateY(-${currentIndex * 4.5}rem)` }}
      >
        {topics.map((topic) => (
          <a
            key={`${topic.name}-${topic.created_at}`}
            href={`https://github.com/topics/${topic.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors block"
          >
            <h3 className="font-medium text-blue-600 dark:text-blue-400">
              {topic.display_name || topic.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {topic.short_description ||
                topic.description ||
                "Explore this topic on GitHub"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
