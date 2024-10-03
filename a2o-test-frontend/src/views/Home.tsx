import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex flex-col p-5 text-2xl font-bold gap-7">
        <div>
          <Link to="/problem-1" className="p-2 bg-white rounded-lg">
            Problem 1
          </Link>
        </div>
        <div>
          <Link to="/problem-2" className="p-2 bg-white rounded-lg">
            Problem 2
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
