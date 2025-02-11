Feature: User Authentication Test with scenario

  Background:
    Given User should be on login page

  Scenario Outline: User login with valid credentials
    And User enters username as "<username>"
    And User enters password as "<password>"
    And User clicks Login Button
    Then User should be navigate to dashboard page "<expectedStatus>"

    Examples:
      | username | password | expectedStatus |
      | Admin    | admin123 | Dashboard      |

  Scenario Outline: User can search
  And User enters username as "Admin"
    And User enters password as "admin123"
    And User clicks Login Button
    And User enters search text in search bar "<searchData>"
    Then The search list contains "<searchData>"

    Examples:
      | searchData  |
      | Admin       |
      # | PIM         |
      # | Leave       |
      # | Time        |
      # | Recruitment |
      # | My Info     |
      # | Performance |
