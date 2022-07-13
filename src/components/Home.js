import React from "react";
//import AddANote from "./AddANote";

import Notes from "./Notes";

const Home = (props) => {
  const { showAlert } = props;
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
