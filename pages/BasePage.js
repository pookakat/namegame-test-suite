import { Selector } from "testcafe";

export class BasePage {

    baseUrl = 'http://www.ericrochester.com/name-game/';

    title = Selector(".header")
    name = Selector("#name")
    picname = Selector(".photo .name")
    firstPhoto = Selector(".photo")
    attempts = Selector(".attempts")
    correct = Selector(".correct")
    streak = Selector(".streak")
    right = Selector(".right")
    wrong = Selector(".wrong")

}