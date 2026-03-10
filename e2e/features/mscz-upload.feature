Feature: MuseScore File Upload
  As a redactor I want to upload sheet music files

  Scenario: Upload section visible in song form
    Given I am logged in as a redactor
    When I navigate to the song edit form
    Then I should see the MuseScore upload section

  Scenario: Upload mscz, svg, pdf files
    Given I am logged in as a redactor
    And I am on the song edit form
    When I upload a .mscz file
    And I upload a .svg file
    And I upload a .pdf file
    And I save the song
    Then the song should have mscz content associated
