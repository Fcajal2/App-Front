import { useEffect, useState } from "react";
import "./styles.css";
import ProductItem from "./Components/ProductItem";

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: string;
};

export type Inputs = Omit<Product, "id">;

export const handleDelete = (id: number) => {
  // le falta el update, preguntar, no puede tomar lo q esta dentro de function app
  fetch(`http://localhost:3001/product/${id}`, {
    method: "DELETE",
    // }).then(() => {
    //   update();
  });
};

function App() {
  const [products, setProducts] = useState<Product[]>();
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    brand: "",
    price: "",
  });

  const update = () => {
    fetch("http://localhost:3001/product").then((result) => {
      result.json().then((data: Product[]) => {
        setProducts(data);
        console.log(data);
      });
    });
  };

  useEffect(() => {
    update();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3001/product", {
      method: "POST",
      body: JSON.stringify({ ...inputs, price: Number(inputs.price) }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      update();
    });
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    fetch(`http://localhost:3001/product/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...inputs, price: Number(inputs.price) }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      update();
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof Inputs;
    inputs[name] = e.target.value;
    setInputs({ ...inputs });
  };

  return (
    <div>
      <div className="d-flex m-1">
        {products?.map((product) => {
          return <ProductItem product={product} />;
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <input placeholder={"name"} name={"name"} onChange={handleChange} />
        <input placeholder={"brand"} name={"brand"} onChange={handleChange} />
        <input
          placeholder={"price"}
          type={"number"}
          name={"price"}
          onChange={handleChange}
        />
        <button>Crear</button>
      </form>
    </div>
  );
}

export default App;
