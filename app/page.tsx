import { Suspense } from "react";
import IssuesList from "./components/IssuesList";
import SearchForm from "./components/SearchForm";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Open Source Contributor</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find and filter issues from any GitHub repository to start
            contributing
          </p>
        </div>

        <SearchForm />

        <Suspense fallback={<div>Loading issues...</div>}>
          <IssuesList />
        </Suspense>
      </main>
    </div>
  );
}
