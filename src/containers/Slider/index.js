import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  new Date(evtB.date) - new Date(evtA.date)
  );
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((events, idx) => (
           <>
          <div
            key={events.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={events.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{events.title}</h3>
                <p>{events.description}</p>
                <div>{getMonth(new Date(events.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                key={`${byDateDesc[radioIdx].id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  />
                  ))}
                </div>
              </div>
            </>
          ))}
        </div>
      );
    };
    
 
export default Slider;
