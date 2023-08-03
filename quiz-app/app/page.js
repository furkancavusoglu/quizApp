"use client"
import Link from "next/link"

export default function Home() {
  return (
    <main >
      <div className="main-page-container">
        <h1>Quiz App</h1>
        <p>Test your knowledge</p>
        <p>Click the button below to start the quiz</p>
        <p>Good Luck!</p>
        <br />
        <Link href={"/quiz"} ><button>Start Quiz</button></Link>
      </div>
    </main>
  )
}
