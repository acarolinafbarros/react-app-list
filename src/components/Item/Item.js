import "./Item.css";

const checkSubscription = (price) => {
  return price === 0 ? "Free" : `${price/100}.00€`;
}

export const Item = ({ name, description, categories, subscriptions }) => {
  return (
    <div key={name} data-testid="item" className="item">
      <div className="firstContainer">
        <span data-testid="name" className="name">{name}</span>
        <div>
          {categories.map(categorie => (
            <span data-testid="category" className="category">{categorie} </span>
          ))}
        </div>
      </div>
      <span data-testid="description" className="description">{description}</span>
      <div className="secondContainer">
        {subscriptions.map(subscription => (
          <>
            <span data-testid="subscription-name" className="subscriptionName">{subscription.name}</span>
            <span data-testid="subscription-price" className="subscriptionPrice">{checkSubscription(subscription.price)}</span>
          </>
        ))}
      </div>
    </div>
  )
};