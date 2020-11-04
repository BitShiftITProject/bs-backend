import {Pages, Portfolios, Users} from "../models"

export const test_user_1 = new Users({
  username: "USER",
  first_name: "user",
  last_name: "user last name",
  email: "user@gmail.com",
  cognito_id: "12a12311b2"
})

export const test_portfolio_1 = new Portfolios({
  title: "Test Portfolio",
  description: "Test Portfolio 1 Description"
})

export const test_portfolio_2 = new Portfolios({
  title: "Test Portfolio",
  description: "Test Portfolio 2 Description",
  theme: "Dark",
  pageOrder: []
})

export const test_page_empty = new Pages({
  title: "Empty page",
  content: {
    sections: []
  }
})

export const test_page_basic = new Pages({
  title: "Basic page",
  content: {
    sections: [{id: "text", data: ""}]
  }
})
