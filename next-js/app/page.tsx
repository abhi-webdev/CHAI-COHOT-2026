import Button from "./components/Button";

export default async function Home() {
  const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10")
  const data = await res.json()

  console.log(data);
  
  return (
    <>
      <h1>Home Page</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
      <Button />
    </>
  )
}