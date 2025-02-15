Feature: User Authentication Test with scenario

  Background:
    Given User should be on login page

  Scenario Outline: Login With Valid Credentials
    And User enters username as "<username>"
    And User enters password as "<password>"
    And User clicks Login Button
    Then User should be navigate to product page "<expectedStatus>"

    Examples:
      | username      | password     | expectedStatus |
      | standard_user | secret_sauce | Products       |

  Scenario Outline: Login With Invalid Credentials
    And User enters username as "<username>"
    And User enters password as "<password>"
    And User clicks Login Button
    Then User should receive an error message as "<expectedStatus>"

    Examples:
      | username        | password      | expectedStatus                                              |
      | locked_out_user | secret_sauce  | Sorry, this user has been locked out.                       |
      | standard_user   | secret_sauce1 | Username and password do not match any user in this service |
      |                 |               | Username is required                                        |
      | standard_user   |               | Password is required                                        |
      |                 | secret_sauce  | Username is required                                        |

 
