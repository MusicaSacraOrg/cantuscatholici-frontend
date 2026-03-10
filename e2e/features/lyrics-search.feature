Feature: Lyrics Snippets in Search
  As a user I want to see matching lyrics in search results

  Scenario: Search shows lyrics snippet
    Given there are songs with lyrics
    When I search for a word that appears in lyrics
    Then search results should show a lyrics snippet

  Scenario: No snippet for title-only matches
    Given there are songs with lyrics
    When I search for a song by title
    Then search results should not show a lyrics snippet
