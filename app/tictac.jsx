//parent

export default function PackingList() {
  return (
    <section className="m-10 bg-gray-100 p-5">
      <h1 className="mb-6 bg-gray-200 p-5 rounded-lg">Sally Ride's Packing List</h1>


      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
            <Item
            isPacked={false}
            name="Photo of Tam"
            />
      </ul>
      <div>
        
      </div>
    </section>
  );
}


// child
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'}
    </li>
  );
}
