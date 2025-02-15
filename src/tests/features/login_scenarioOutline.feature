Feature: User Authentication Test with scenario

  Background:
    Given User should be on login page

  Scenario Outline: User login with valid credentials
    And User enters username as "<username>"
    And User enters password as "<password>"
    And User clicks Login Button
    Then User should be navigate to product page "<expectedStatus>"

    Examples:
      | username      | password     | expectedStatus |
      | standard_user | secret_sauce | Products       |

  Scenario Outline: User can see products
    And User enters username as "standard_user"
    And User enters password as "secret_sauce"
    And User clicks Login Button
    And user should see the items in the list "<expectedItems>"

    Examples:
      | expectedItems                     |
      | Sauce Labs Backpack               |
      | Sauce Labs Bike Light             |
      | Sauce Labs Bolt T-Shirt           |
      | Sauce Labs Fleece Jacket          |
      | Sauce Labs Onesie                 |
      | Test.allTheThings() T-Shirt (Red) |
