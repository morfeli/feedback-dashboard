const SuggestionCards = (props) => {
  return (
    <li>
      <div>
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <p>{props.category}</p>
        <button>{props.upvotes}</button>
        <button>{props.comments}</button>
      </div>
    </li>
  );
};

export default SuggestionCards;
