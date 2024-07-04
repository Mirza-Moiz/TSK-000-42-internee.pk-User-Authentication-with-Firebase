const HomePage = ({ authUser }) => {
  return (
    <div>
      <h1>Home Page</h1>
      {authUser && <p>Welcome, {authUser.email}</p>}
    </div>
  );
};

export default HomePage;
