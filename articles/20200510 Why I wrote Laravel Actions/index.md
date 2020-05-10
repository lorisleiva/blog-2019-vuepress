---
permalink: why-i-wrote-laravel-actions
image: /covers/why-i-wrote-laravel-actions.png
description: I explain my motivations for writing Laravel Actions and provide a small refactoring example.
tags: ['Laravel', 'Open Source']
date: 2020-05-10T14:00:00Z
---

# Why I wrote Laravel Actions
As I recently released version 1.0 of Laravel Actions, I thought I’d write a little article explaining my motivations for developing this package.

## An unintuitive structure
I absolutely love the Laravel Framework. It enables me to go from idea to prototype very quickly whilst being able to scale if whatever I’m building turns out to have some sort of traction.

BUT. (Big but.)

But when organising all my classes within the app directory, I often find myself having to look into various places to find similar pieces of logic.

Say you have an `ArticleController` on your blog and you’re writing an endpoint for updating an article. Then you’ll very likely have to:
* Define a new route in your `routes/web.php` file.
* Create an `UpdateArticleRequest` class in the `app/Http/Requests` directory to define your validation logic.
* Add a new method in your `app/Policies/ArticlePolicy` class to define your authorisation logic.
* Finally, write your main logic in the `update` method of your `ArticleController` amongst other methods that manages other aspects of your `Article` model.

Phew...

Whilst this separation of concerns makes perfect sense at the engineering level, it lacks intuition on the domain level.

When you visit a new house you don’t think: “okay, this house has a total of 17 walls, 5 windows, 8 doors and 463 items”. Instead you might enter each room one by one and explore what’s inside.

This is how I’d like to visit my application’s code too. Not as a set of web application patterns but as a set of features it provides grouped in a way that makes sense to my domain.

## Not quite Domain-Driven
Now if you know a bit about Domain Driven Design (DDD), you will understand that using DDD principles in a Laravel application is not a trivial task — [I did try though](https://lorisleiva.com/conciliating-laravel-and-ddd/).

You cannot have both an opinionated framework that gives you super powers and enables you to create a working prototype in a few days AND a neutral framework that encourages you to define your own domain-driven architecture.

But, unless you’re building an application for a bank or a division of some government, why would you want to start spending months coming up with the perfect domain structure for an application that might never even see the light of day?

Here is my point: DDD is a philosophy. You might not agree with everything and you probably don’t want to make your entire life about it but it has some very good points that you could benefit from.

So, how can we reach a more intuitive structure (closer to our domain) whilst carrying on using our beloved Laravel framework and all the amazing features that comes with it?

## A beautiful compromise
If you’ve spend a bit of time developing a frontend using VueJS, you might be familiar with Single-File Components. They are simple `.vue` files that wraps all you need to design a piece of UI. That is the HTML, the CSS and the JavaScript (or any modern alternatives of these languages).

That organisation system makes total sense to me. If later on I need to adjust the design and/or the behaviour of a dropdown menu, it’s all in one place. Furthermore, components can be re-used within components so you can elegantly abstract common logic.

At the end, you are left with a very big set of components that almost entirely defines your frontend. You are free to organise these components in any way that makes sense to your domain. You might, for example, have a folder for your “base” components that are shared everywhere like a button or a modal component; a folder for your login pages; a folder for your billing pages; etc.

I find this concept of having a single “unit of life” in our applications very elegant. Much like the cells in our body. They all share the same structure but take care of one single action.

Laravel Actions aims to bring that concept into the Laravel framework. Whilst in the backend world we do not worry about HTML, CSS and JavaScript, we do have various engineering concepts that could do with being abstracted in a single “unit of life” that will now be referred to as an “Action”.

Actions provide a more intuitive structure that focuses on you domain whilst embracing the features of the framework it relies upon.

## A new unit of life
You might have been using a similar concept already in your applications. Lots of articles (e.g. from [Michael Dyrynda](https://dyrynda.com.au/blog/single-action-controllers-in-laravel) or [Dries Vints](https://driesvints.com/blog/the-beauty-of-single-action-controllers/)) are talking about the benefits of only using invokable controllers, i.e. defining each endpoint in a dedicated class.

This is a good first step as it allows you to organise your controllers more intuitively.

However, you are still likely going to write your authorisation and/or validation logic somewhere else (e.g. in custom Request classes). And even if you didn’t, what about jobs, event listeners or console commands? They are also likely to contain domain logic, yet, they will live outside of your “domain-friendly” folder structure.

And what about common logic shared between controllers, between jobs, between controllers and jobs, etc? Have you ever shamefully googled “how to call a controller from a controller?”? In the end, that responsibility tend to be delegated to Models which make them unmaintainable god-like objets.

With Laravel Actions,
* Actions take care of a single task.
* Actions are responsible for their own authorisation, validation and execution.
* Actions can be reused within other Actions to provide a lower granularity of logic.
* Actions can be executed as controllers, event listeners, jobs, console commands or simple objects.

```php
# As controllers
Route::post('/article', '\App\Actions\CreateNewArticle');

# As event listeners
protected $listen = [
    'App\Events\NewFeatureReleased' => ['App\Actions\CreateNewArticle'],
];

# As jobs
CreateNewArticle::dispatch(['title' => 'My new article']);

# As console commands (inside your action)
public static $commandSignature = 'make:article {title}';

# Or as simple objects
new CreateNewArticle(['title' => 'My new article']);
```

Therefore, just like Single-File Components in VueJS, we end up with a big set of Actions that almost entirely define our backend. And it is up to us to organise them intuitively.

## A small refactoring example
Before I wrap up this article, I thought I’d go through a quick refactoring so you can judge for yourself if this is a more intuitive way to organise your backend.

### Before

Let’s take the example of a small CRM application. `Users` can connect and manage their `Leads` that can be associated with `Opportunities`. 

To add some extra complexity to our example, let’s say `Opportunities` are automatically updated based on some third party integrations. We’ll use two fictional integrations: MarketGuru (compares the opportunity with the rest of the market) and PersonalityOracle (uses psychology to determine the likelihood of the opportunity).

```
app/
├── Console/
│   ├── Commands/ [8]
│   │   ├── MakeLeadCommand.php
│   │   └── MakeOpportunityCommand.php
│   └── Kernel.php
├── Events/ [6]
│   ├── OpportunityLost.php
│   └── OpportunityWon.php
├── Jobs/
│   └── UpdateOpportunitiesFromThirdPartyIntegrations.php [7]
├── Http/
│   ├── Controllers/
│   │   ├── Auth/ [2]
│   │   ├── LeadController.php [3]
│   │   ├── OpportunityController.php [4]
│   │   └── UserController.php [5]
│   ├── Middleware/
│   ├── Requests/
│   │   ├── LeadStoreRequest.php [3]
│   │   ├── LeadUpdateRequest.php [3]
│   │   ├── OpportunityStoreRequest.php [4]
│   │   ├── OpportunityUpdateRequest.php [4]
│   │   └── UserUpdateRequest.php [5]
│   └── Kernel.php
├── Listeners/ [6]
│   ├── MarkLeadAsCustomer.php
│   └── MarkLeadAsLost.php
├── Policies/
│   ├── LeadPolicy.php [3]
│   └── OpportunityPolicy.php [4]
├── Services/ [7]
│   ├── MarketGuruClient.php
│   └── PersonalityOracleClient.php
├── Lead.php [1]
└── Opportunity.php
└── User.php
```

This structure should be fairly familiar.

1. We have our `User`, `Lead` and `Opportunity` models.
2. We have the `Auth/` controllers for registering, logging in, etc.
3. We have a `LeadController` that contains CRUD endpoints such as `index`, `show`, `store`, `update` and `destroy` but also additional endpoints for marking a lead as a customer (`markAsCustomer`); marking it as lost (`markAsLost`); or bulk deleting them (`bulkDestroy`). Additionally, we have two Request classes for adding and updating leads and one Policy class to host our authorisation logic.
4. Same story for the `OpportunityController` except that the `index` endpoint can either return "all opportunities for a given lead" or "all active opportunities for the user" depending on the Request.
5. The `UserController` is used to get and update the user’s settings. That is, their details (name and email), avatar, password and/or email preferences. Therefore, most of the logic in that controller lives in the `update` endpoint.
6. Whenever an opportunity is won or lost, we trigger the `MarkLeadAsCustomer` and `MarkLeadAsLost` listeners respectively.
7. For our MarketGuru and PersonalityOracle integrations, we have two clients and one job scheduled every day at midnight.
8. We have two commands `make:lead` and `make:opportunity` that help us generate dummy data locally.

### After

Let’s now see how a refactoring of this application using Laravel Actions could look like.

```
app/
├── Actions/
│   ├── Authentication/
│   ├── Integrations/
│   │   ├── MarketGuruClient/
│   │   │   ├── Client.php
│   │   │   ├── GetMarketReportForOpportunity.php
│   │   │   └── UpdateOpportunity.php
│   │   └── PersonalityOracle/
│   │       ├── Client.php
│   │       ├── GetPersonalityLikelihoodForOpportunity.php
│   │       └── UpdateOpportunity.php
│   ├── Leads/
│   │   ├── BulkRemoveLead.php
│   │   ├── CreateNewLead.php
│   │   ├── GetLeadDetails.php
│   │   ├── MarkLeadAsCustomer.php
│   │   ├── MarkLeadAsLost.php
│   │   ├── RemoveLead.php
│   │   ├── SearchLeadsForUser.php
│   │   └── UpdateLeadDetails.php
│   ├── Opportunities/
│   │   ├── CreateNewOpportunityForLead.php
│   │   ├── GetOpportunityDetails.php
│   │   ├── ListAllActiveOpportunitiesForUser.php
│   │   ├── ListOpportunitiesForLead.php
│   │   ├── MarkOpportunityAsLost.php
│   │   ├── MarkOpportunityAsWon.php
│   │   ├── RemoveOpportunity.php
│   │   ├── UpdateOpportunityDetails.php
│   │   └── UpdateOpportunitiesFromThirdPartyIntegrations.php
│   └── Settings/
│       ├── GetUserSettings.php
│       ├── UpdateEmailPreferences.php
│       ├── UpdateUserAvatar.php
│       ├── UpdateUserDetails.php
│       ├── UpdateUserPassword.php
│       ├── UpdateUserSettings.php
│       └── DeleteUserAccount.php
├── Events/
│   ├── OpportunityLost.php
│   └── OpportunityWon.php
├── Lead.php
└── Opportunity.php
└── User.php
```

First of all, how eloquent is that? A new developer joining the project can look at that folder structure and immediately understand every feature that the application provides. If they need to update the behaviour of a feature, they will know immediately were to go.

If you read back the points 3, 4 and 5 from the "Before" section, you wouldn’t have been able to guess them without opening the files and reading the code. Now, most of the domain logic is obvious.

Note that:
* We no longer need `App\Listeners\MarkLeadAsCustomer` and `App\Listeners\MarkLeadAsLost` since we can use `App\Actions\Lead\MarkLeadAsCustomer` and `App\Actions\Lead\MarkLeadAsLost` instead.
* We no longer need `MakeLeadCommand` and `MakeOpportunityCommand` since we can simply use the `CreateNewLead` and `CreateNewOpportunityForLead` actions as commands instead.
* We no longer need Request classes.
* We no longer need Policy classes.
* We no longer need Controllers except maybe for the `Auth/` folder if you want to reuse what Laravel provides out-of-the-box (I might translate these into Actions in the near future).
* Each integration now has its own folder regrouping its actions but also its HTTP client.
* The job `UpdateOpportunitiesFromThirdPartyIntegrations` is now an action that calls the `UpdateOpportunity` actions from every integration.
* The `BulkRemoveLead` action makes use of the `RemoveLead` action.
* The `UpdateUserSettings` delegates to the `UpdateUserDetails`, `UpdateUserAvatar`, `UpdateUserPassword` and/or `UpdateEmailPreferences` actions based on the attributes provided.
* What was previously `OpportunityController@index` has been separated into two actions: `ListOpportunitiesForLead` and `ListAllActiveOpportunitiesForUser`.
* You can run any of these actions as plain objects in your tests.
* You can use the exact same folder structure in your tests.

```
tests/
└── Actions/
    ├── Authentication/
    ├── Integrations/
    ├── Leads/
    │   ├── CreateNewLeadTest.php
    │   └── ...
    ├── Opportunities/
    └── Settings/
```

## Conclusion
Laravel Actions has been released almost exactly one year ago and I’m so excited to have finally released it as a version 1.0. I hope this article helped understanding the rationales behind this package and I’m looking forward to get more feedback from the community which has already been instrumental during this entire year.

<GithubButton url="https://github.com/lorisleiva/laravel-actions" title="Laravel Actions on GitHub"></GithubButton>
