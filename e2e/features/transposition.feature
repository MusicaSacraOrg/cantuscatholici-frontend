Feature: Song Transposition
  As a user I want to transpose sheet music

  Scenario: Transposition controls visible for songs with mscz
    Given there is a song with uploaded mscz content
    When I navigate to the song sheets tab
    Then I should see transposition controls

  Scenario: Transposition controls hidden without mscz
    Given there is a song without mscz content
    When I navigate to the song sheets tab
    Then I should not see transposition controls

  Scenario: Transpose up
    Given I am logged in
    And I am on a song sheets tab with mscz content
    When I click the "+" transposition button
    Then the transposition label should show "+1 polton"

  Scenario: Error when MuseScore unavailable
    Given I am logged in
    And MuseScore is not installed on the server
    When I try to transpose
    Then I should see an error message
