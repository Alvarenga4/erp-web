# FILE: sov-svc-icatu-individual-quotation.feature
Feature: Icatu life insurance quotation for individuals
  As a customer
  I want to quote a life insurance from Icatu at the Icatu Provider
  In order to have the coverages premium values accordingly to my personal data

Background:
  Given the Icatu Provider is up and running
  And there is the following age vs fee table
    | min_age | max_age | fee    |
    | 18      | 35      | 0.2341 |
    | 36      | 40      | 0.2670 |
    | 41      | 45      | 0.4016 |
    | 46      | 50      | 0.7022 |
    | 51      | 55      | 1.0206 |
    | 56      | 60      | 1.6274 |
    | 61      | 65      | 2.7399 |

  Scenario Outline: Price quotation with a lower age unaccepted
    Given the request address to create a quote
      | uri                      |
      | /api/v1/quote/individual |
    And the following payload
      """
      {
        "tenderer": {
          "document": "54867119059",
          "occupationCode": 12,
          "birthDate": "<birth_date>",
          "gender": "MALE",
          "income": 15000,
          "retired": "NO",
          "behavior": {
            "smoker": true
           }
         },
        "productCode": "12345_32_99",
        "coverage": {
          {
            "code": 123,
            "value": 98765.12,
            "type": "NOMINAL"
           },
          {
            "code": 456,
            "value": 876541.12,
            "type": "NOMINAL"
           }
         }
       }
      """
    When I quote an individual life insurance
    Then the request is granted
    And the Icatu Provider replies a failure message
    And the following response content is sent
      """
      {
        "data": {
          "success": false,
          "message": "<failed business rule>"
          "raw": {
            "status": "422.X",
            "messagem": "Descrição do erro de negócio."
          }
        }
      }
      """
    And the success attribute is true
    Examples:
      | birth_date | age |
      | BIRTH_DATE | 15  |


    Scenario Outline: Price quotation with an upper age unaccepted
      Given the request address to create a quote
        | uri                      |
        | /api/v1/quote/individual |
      And the following payload
        """
        {
          "tenderer": {
            "document": "54867119059",
            "occupationCode": 12,
            "birthDate": "<birth_date>",
            "gender": "MALE",
            "income": 15000,
            "retired": "NO",
            "behavior": {
              "smoker": true
             }
           },
          "productCode": "12345_32_99",
          "coverage": {
            {
              "code": 123,
              "value": 98765.12,
              "type": "NOMINAL"
             },
            {
              "code": 456,
              "value": 876541.12,
              "type": "NOMINAL"
             }
           }
         }
        """
      When I quote an individual life insurance
      Then the request is granted
      And the Icatu Provider replies a failure message
      And the following response content is sent
        """
        {
          "data": {
            "success": false,
            "message": "<failed business rule>"
            "raw": {
              "status": "422.X",
              "messagem": "Descrição do erro de negócio."
            }
          }
        }
        """
      And the success attribute is true
      Examples:
        | birth_date | age |
        | BIRTH_DATE | 66  |


  Scenario Outline: Price quotation with valid ages
    Given the request address to create a quote
      | uri                      |
      | /api/v1/quote/individual |
    And the following payload
      """
      {
        "tenderer": {
          "document": "54867119059",
          "occupationCode": 12,
          "birthDate": "<birth_date>",
          "gender": "MALE",
          "income": 15000,
          "retired": "NO",
          "behavior": {
            "smoker": true
           }
         },
        "productCode": "12345_32_99",
        "coverage": {
          {
            "code": 123,
            "value": 98765.12,
            "type": "NOMINAL"
           },
          {
            "code": 456,
            "value": 876541.12,
            "type": "NOMINAL"
           }
         }
       }
      """
    When I quote an individual life insurance
    Then the request is granted
    And the Icatu Provider replies a success message
    And the following response content is sent
      """
      {
        "data": {
          "success": true,
          "id": "f4935f2c-0392-4dd5-aa3e-f7499c07bf05",
          "premium": <premium>,
          "coverage": {
            {
              "code": 123,
              "value": 98765.12,
              "premium": <premium_one>
             },
            {
              "code": 456,
              "value": 876541.12,
              "premium": <premium_two>
             }
           }
          "raw": {
            "valorPremioTotal": 79.53,
            "idCotacao": "f4935f2c-0392-4dd5-aa3e-f7499c07bf05",
            "coberturas": {
              {
                "numero": 123,
                "valorPremio": <premium_one>,
                "valorCapital": 98765.12
               },
              {
                "numero": 456,
                "valorPremio": <premium_two>,
                "valorCapital": 876541.12
               }
             }
           }
         }
       }
      """
    And the success attribute is true
    And the premium attribute is <premium>
    Examples:
      | birth_date | age | fee    | capital_one | premium_one | capital_two | premium_two | premium |
      | BIRTH_DATE | 20  | 0.2341 | 98765.12    | 23.12       | 876541.12   | 205.20      | 228.32  |
      | BIRTH_DATE | 39  | 0.2670 | 98765.12    | 26.37       | 876541.12   | 234.04      | 260.41  |
      | BIRTH_DATE | 42  | 0.4016 | 98765.12    | 39.66       | 876541.12   | 352.02      | 391.68  |
      | BIRTH_DATE | 48  | 0.7022 | 98765.12    | 69.35       | 876541.12   | 615.51      | 684.86  |
      | BIRTH_DATE | 53  | 1.0206 | 98765.12    | 100.80      | 876541.12   | 894.60      | 995.40  |
      | BIRTH_DATE | 57  | 1.6274 | 98765.12    | 160.73      | 876541.12   | 1426.48     | 1587.21 |
      | BIRTH_DATE | 63  | 2.7399 | 98765.12    | 270.61      | 876541.12   | 2401.64     | 2672.24 |
