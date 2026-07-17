
import './App.css'

function App() {

  const shows = [
    {
      id: 1,
      name: "The components return",
      time: "10:00 am",
      hall: "Hall A"
    },
    {
      id: 2,
      name: "Attacher of the re-render",
      time: "12:30 pm",
      hall: "Hall B"
    },
    {
      id: 3,
      name: "Virtual DOM Nights",
      time: "04:00 pm",
      hall: "Hall C"
    },
  ]
  const data =  fetch("")
  return (
    <>
      <h1>Hello</h1>
      <section className='grid'>
        {shows.map((show) => (
              <article>
                <h1>{show.name}</h1>
                <h3>{show.time}</h3>
                <p>{show.hall}</p>
              </article>
          )
        )}
      </section>
    </>
  )
}

export default App
