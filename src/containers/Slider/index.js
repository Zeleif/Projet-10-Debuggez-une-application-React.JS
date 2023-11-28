import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  //  tri en fonction de la propriété date de chaque objet dans le tableau, dans un ordre descendant.
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
   new Date(evtA.date) < new Date(evtB.date) ? 1 : -1 
  );
  const nextCard = () => {
    if (byDateDesc !== undefined) {
      setTimeout(
        // permet d'obtenir le dernier évènement de la liste d'évènements grâce à son index (-1)
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, eventIdx) => (
        <div
          key={`${event.title}-${event.description}-${event.date}`}
          className={`SlideCard SlideCard--${
            index === eventIdx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
            // key unique suite erreur console
              key={`${event.title}-${event.description}-${event.date}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              // ajout de la fonction onChange suite erreur console
              onChange={() => setIndex(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default Slider;