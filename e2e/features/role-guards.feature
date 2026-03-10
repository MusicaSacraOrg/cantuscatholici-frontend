Feature: Role-Based Access Control
  As the system I want to restrict write operations to redactors

  Scenario: Regular user cannot create songs
    Given I am logged in as a regular user
    When I try to create a song via API
    Then I should receive a 403 error

  Scenario: Redactor can create songs
    Given I am logged in as a redactor
    When I try to create a song via API
    Then the song should be created successfully

  Scenario: Regular user cannot approve reviews
    Given I am logged in as a regular user
    When I try to approve a review via API
    Then I should receive a 403 error
