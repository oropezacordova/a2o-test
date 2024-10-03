import React from "react";
import { Crown, BrickWall, Sword, ArrowBigLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Result {
  response: number;
  matrix: number[][];
  errors: Errors;
}

interface Errors {
  n: string;
  k: string;
  rq: string;
  cq: string;
  obstacles: string;
}

const Problem1 = () => {
  const [formData, setFormData] = React.useState<string>("");
  const [response, setResponse] = React.useState<number>(0);
  const [matrix, setMatrix] = React.useState<number[][]>([]);
  const [errors, setErrors] = React.useState<Errors>({
    n: "",
    k: "",
    rq: "",
    cq: "",
    obstacles: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      n: "",
      k: "",
      rq: "",
      cq: "",
      obstacles: "",
    });
    let numbers: string[] = [];
    let obstacles: string[][] = [];
    let lines = formData.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (i < 2) {
        lines[i].split(" ").forEach((value) => {
          numbers.push(value);
        });
      }
      if (i >= 2 && lines[i] !== "") {
        obstacles.push(lines[i].split(" "));
      }
    }
    try {
      const result = await fetch("http://localhost:8000/api/problem-1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          n: numbers[0],
          k: numbers[1],
          rq: numbers[2],
          cq: numbers[3],
          obstacles: obstacles,
        }),
      });
      const data: Result = await result.json();
      if (!data.errors) {
        setResponse(data.response);
        setMatrix(data.matrix.reverse());
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      console.log("error internal");
    }
  };
  return (
    <>
      <div className="container m-auto">
        <div>
          <Link to="/" >
            <ArrowBigLeft size={40} />
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold text-center">
            Problem 1: Chess
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full gap-2"
          >
            <div className="flex flex-col w-full gap-4 max-w-96">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="input-1" className="">
                  Input
                </label>
                <textarea
                  id="input-1"
                  value={formData}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-1 border-2 rounded-md"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white rounded-md bg-neutral-500 hover:bg-neutral-400"
            >
              Submit
            </button>
          </form>
          {errors.n && (
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold text-red-500">{errors.n}</h1>
            </div>
          )}
          {errors.k && (
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold text-red-500">{errors.k}</h1>
            </div>
          )}
          {errors.rq && (
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold text-red-500">{errors.rq}</h1>
            </div>
          )}
          {errors.cq && (
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold text-red-500">{errors.cq}</h1>
            </div>
          )}
          {errors.obstacles && (
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold text-red-500">
                {errors.obstacles}
              </h1>
            </div>
          )}
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold">Response:</h1>
            <pre className="text-2xl" id="output-1">
              {response}
            </pre>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            {matrix.map((row, i) => (
              <div key={i} className="flex items-center justify-center w-full">
                {row.map((value, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-center w-full border-2 rounded-md max-w-20 border-neutral-100 bg-neutral-600 aspect-[1/1]"
                  >
                    {value === 2 ? (
                      <div>
                        <Crown size={40} color="#ebe300" />
                      </div>
                    ) : value === 1 ? (
                      <Sword size={40} color="#b0b0b0" />
                    ) : value === 3 ? (
                      <BrickWall size={40} color="#5f4311" />
                    ) : (
                      " "
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Problem1;
