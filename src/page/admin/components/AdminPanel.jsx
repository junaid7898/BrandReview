import React from "react";
const AdminPanel = () => {
  return (
    <section className="panel">
      <div className="panel__div">
        <div className="panel__div__intro">
          <h1>Admin Panel</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="panel__div__details">
          <div className="panel__div__details__initials">
                    <div>
                        <h3>Review Count</h3>
                        <h1>16m</h1>
                    </div>
                    <div>
                        <h3>Solved Count</h3>
                        <h1>3.4m</h1>
                    </div>
                    <div>
                        <h3>Satisfaction</h3>
                        <h1>96%</h1>
                    </div>
          </div>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
