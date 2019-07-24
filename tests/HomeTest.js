import { BasePage } from "../pages/BasePage";

const page = new BasePage();

fixture`Home`.page(page.baseUrl);

test('Correct title displays', async t => {
    await t
        .expect(page.title.textContent)
        .eql("name game")
});

test('Question displays a name', async t =>{
    await t
        .expect(page.name.textContent)
        .notEql("");
});

test('Name questioned is displayed in a picture', async t =>{
    var questName = await page.name.textContent;
    const picNames = page.picname;
    const count = await picNames.count
    let match = false;

    for (var i = 0; i < count; i++) {
        let nameTested = await picNames.nth(i).textContent;
        console.log(questName, nameTested);
        match = match || nameTested === questName;
    }

  await t.expect( match ).ok("Name questioned does not match any photo.");
  });
  

test('Attempts counter increments after selecting a photo', async t => {
    const initialAttemptsCount = Number(await page.attempts.textContent)
    
    await t.click(page.firstPhoto);

    const finalAttemptsCount = Number(await page.attempts.textContent);

    await t
    .expect(finalAttemptsCount)
    .eql(initialAttemptsCount + 1);
});