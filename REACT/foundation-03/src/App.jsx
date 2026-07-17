import AvatarCard from './components/AvatarCard';
import './App.css'

const avatars = [
  {
    id: 1,
    name: "John Doe",
    role: "Admin",
    power: "Full Access",
    initials: "JD",
  },
  {
    id: 2,
    name: "Emma Watson",
    role: "Manager",
    power: "Manage Teams",
    initials: "EW",
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Developer",
    power: "Code & Deploy",
    initials: "MB",
  },
  {
    id: 4,
    name: "Sophia Lee",
    role: "Designer",
    power: "UI/UX Design",
    initials: "SL",
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Tester",
    power: "Quality Assurance",
    initials: "DW",
  },
  
];

function Shell ({title, children}) {
  return (
    <section>
      <p>Resuable shell</p>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function App() {

  return (
    <>
      <h1>Hello abhi jii</h1>
      <section>
        {avatars.map((val) => (
        <AvatarCard 
          key={val.id}
          level = {val.id === 1 ? "Caption" : undefined} 
          avatar={val}
        />
      ))}
      </section>

      <Shell title="SuperMan" >
        <h3>This is running on the children properties from shell</h3>
        <p>children is the reserverd properties</p>
      </Shell>
    </>
  )
}

export default App
