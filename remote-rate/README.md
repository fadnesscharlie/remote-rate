# Remote Rate

## Contributors:

* Charlie Fadness
* Zach Winterton
* Quentin Young
* Phil Murphy

## About This App

Unsure of whether it's worth it to take that job back in the office? Curious how much less you would need to make, to sustain a similar style of living, while working from home? This is the app you've been looking for. Tell us your location, job opportunities, and the type of vehicle you drive, and we'll let you know the cost of commuting, versus staying home

#### [Cooperation Plan](Administrivia/CooperationPlan.md)

#### [Conflict Plan](Administrivia/ConflictPlan.md)

#### [Communication Plan](Administrivia/CommunicationPlan.md)

#### [Work/Git Plan](Administrivia/WorkPlan_Git.md)


## Backend Stuff

[Distance Matrix Response](https://developers.google.com/maps/documentation/distance-matrix/overview#distance-matrix-responses)

This takes in two or more addresses, and returns back the distance between the two and the time it takes to get to that location

Application Start Up Docs

## Data Flow

Here we have our Data Flow.In our Data Bases we will use Google Maps API and a gas API. With Google Maps we will be able to grab the home and work address of the user. Google Maps will be able to transfer those into latitude and longitude for us to use into our Gas API. The Gas API will bring back the closest gas station with the price of the gas to use in our application.

![Data Flow](img/DataBaseSchema.png)
![Data Flow With Database](img/domainModelingDataBase.png)

Domain Modeling
![UML](img/DomainModeling.png)

Story Cards
![Story Cards](img/storyCardsRemoteRate.png)

Wire Frame with Schema
![Wire Frame](img/wireFrameRemoteRate.png)

## Data Base

### Data Base will store:

- userName: string
- userEmail: string
- userCarMPG: int
  - We will use a hardcoded number that that user will pick from
- workAddress: string
- homeAddress: string
- distanceFromWork: int
- offerPrice: int
- APIGasPrice: int
- usersCalculatedGasCost: int

