Feature: Product page

Background:
    Given User should be on product page

@positive
 Scenario Outline: User can see products
    And user should see the items in the list "<expectedItems>"

    Examples:
      | expectedItems                     |
      | Sauce Labs Backpack               |
      | Sauce Labs Bike Light             |
      | Sauce Labs Bolt T-Shirt           |
      | Sauce Labs Fleece Jacket          |
      | Sauce Labs Onesie                 |
      | Test.allTheThings() T-Shirt (Red) |