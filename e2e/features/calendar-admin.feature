Feature: Calendar Admin Management
  As a redactor I want to manage calendar entries

  Scenario: View calendar entry list
    Given I am logged in as a redactor
    When I navigate to the calendar admin page
    Then I should see the calendar entries table

  Scenario: Create a calendar entry
    Given I am logged in as a redactor
    When I navigate to the calendar create form
    And I fill in the calendar entry details
    And I submit the form
    Then the entry should appear in the list

  Scenario: Add song to calendar entry
    Given I am logged in as a redactor
    And there is a calendar entry
    When I edit the entry and search for a song
    And I add the song
    Then the song should be associated with the entry
