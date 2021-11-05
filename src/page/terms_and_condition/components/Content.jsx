import React from "react";
import vector4 from '../../../assests/images/vector4.png'
import vector5 from '../../../assests/images/vector5.png'
import vector6 from '../../../assests/images/vector6.png'

const Content = () => {
  return (
    <section className="content">
      <div className="content__intro">
        <h1>Terms And Condition</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since
        </p>
      </div>
      <div className = 'content__detail'>
        <h3>Last Update on 5 September, 2021</h3>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32. 
        </p>
        <p>
            The standard chunk of Lorem Ipsum used since the
          1500s is reproduced below for those interested. Sections 1.10.32 and
          1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
          reproduced in their exact original form, accompanied by English
          versions from the 1914 translation by H. Rackham.
        </p>
        <p>
          There are many
          variations of passages of Lorem Ipsum available, but the majority have
          suffered alteration in some form, by injected humour, or randomised
          words which don't look even slightly believable. If you are going to
          use a passage of Lorem Ipsum, you need to be sure there isn't anything
          embarrassing hidden in the middle of text. All the Lorem Ipsum
          generators on the Internet tend to repeat predefined chunks as
          necessary, making this the first true generator on the Internet. It
          uses a dictionary of over 200 Latin words, combined with a handful of
          model sentence structures, to generate Lorem Ipsum which looks
          reasonable.
        </p>
        <svg width="38" height="70" viewBox="0 0 38 70" fill="none" xmlns="http://www.w3.org/2000/svg" className = 'vector4'>
          <path d="M36.949 2.50269C17.4594 4.63185 -17.0323 14.8189 0.917728 38.5339C23.3552 68.1777 43.616 28.3864 18.533 20.9187C-6.55002 13.4509 -3.39456 54.239 -4.88481 69.5633" stroke="#FFCC0D" stroke-width="5"/>
        </svg>

        <svg width="48" height="44" viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg" className = 'vector5'>
          <path d="M40.0156 3L44.1245 17.4031L34.9115 16.2078L35.0329 26.7197L17.936 25.6261L22.0449 40.0292L13.4813 38.1684L2.99985 40.9319" stroke="#357BCE" stroke-width="5" stroke-linecap="round"/>
        </svg>

        <img className = 'vector6' src = {vector6} alt = 'background'/>
      </div>
      
    </section>
  );
};

export default Content;
