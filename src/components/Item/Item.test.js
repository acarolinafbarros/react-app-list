import React from "react";
import { render } from "@testing-library/react";
import "jest-dom/extend-expect";
import { Item } from "./Item";
import { 
  ITEM, 
  NAME,
  CATEGORY,
  DESCRIPTION,
  SUBSCRIPTION_NAME, 
  SUBSCRIPTION_PRICE,
 } from "./Item.selectors";

 const mockData = {
  name: "Voice Report",
  description: "Calls reporting and analytics of your calls.",
  categories: ["Voice Analytics", "Reporting", "Optimization"],
  subscriptions: [
    {
      "name": "Trial",
      "price": 0
    },
  ]
};

function renderItem({ 
  name,
  description, 
  categories, 
  subscriptions,
 } = {}) {
  return render(
    <Item
      name={name}
      description={description}
      categories={categories}
      subscriptions={subscriptions}>
    </Item>
  );
}

beforeEach(jest.clearAllMocks);

describe("Item component", () => {
  let item;
  let name;
  let description;
  let category;
  let subscriptionName;
  let subscriptionPrice;

  beforeEach(() => {
    const { container } = renderItem(mockData);
    item = container.querySelector(ITEM);
    name = container.querySelector(NAME);
    description = container.querySelector(DESCRIPTION);
    category = container.querySelector(CATEGORY);
    subscriptionName = container.querySelector(SUBSCRIPTION_NAME);
    subscriptionPrice = container.querySelector(SUBSCRIPTION_PRICE);
  })
    it("should render the item component ", () => {
        expect(item).not.toBeNull();
    });

    it("should render the name equal to 'Voice Report'", () => {
      expect(name).toHaveTextContent("Voice Report");
    });

    it("should render the description equal to 'Calls reporting and analytics of your calls.'", () => {
      expect(description).toHaveTextContent("Calls reporting and analytics of your calls.");
    });

    it("should render the first category equal to 'Voice Analytics'", () => {
      expect(category).toHaveTextContent("Voice Analytics");
    });

    it("should render the subscription name equal to 'Trial'", () => {
      expect(subscriptionName).toHaveTextContent("Trial");
    });

    it("should render the subscription price equal to 'Free'", () => {
      expect(subscriptionPrice).toHaveTextContent("Free");
    });
});
