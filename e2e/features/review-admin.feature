Feature: Admin Review Management
  As a redactor I want to review user-submitted content

  Scenario: View review list
    Given I am logged in as a redactor
    When I navigate to the review admin page
    Then I should see the reviews table

  Scenario: Filter reviews by status
    Given I am logged in as a redactor
    And there are reviews with different statuses
    When I click the "Otvorene" filter tab
    Then I should only see open reviews

  Scenario: Approve a review
    Given I am logged in as a redactor
    And there is an open review
    When I open the review detail
    And I click "Schvalit"
    Then the review status should change to approved

  Scenario: Add a comment to a review
    Given I am logged in as a redactor
    And I am on a review detail page
    When I type a comment and submit
    Then the comment should appear in the thread
