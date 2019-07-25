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
    const questName = await page.name.textContent;
    const picNames = page.picname;
    const count = await picNames.count
    let match = false;

    for (var i = 0; i < count; i++) {
        let nameTested = await picNames.nth(i).textContent;
        /* I have written this console log and
        others in this program as my test within 
        a test. I include them for anyone viewing
        my work. Want to see if it works as it's 
        working? Uncomment out the commented console.log() 
        lines*/
        //console.log(questName, nameTested);
        match = match || nameTested === questName;
    }

  await t.expect( match ).ok();
  });
  

test('Attempts counter increments after selecting a photo', async t => {
    let initialAttemptsCount = Number(await page.attempts.textContent);

    if (initialAttemptsCount === NaN){
        initialAttemptsCount = 0;
    }
    
    await t.click(page.firstPhoto);

    const finalAttemptsCount = Number(await page.attempts.textContent);

    await t
    .expect(finalAttemptsCount)
    .eql(initialAttemptsCount + 1);
});

test('Correct counter increments only after selecting the correct photo', async t => {
    let initialCorrectCount = Number(await page.correct.textContent);

    if (initialCorrectCount === NaN){
        initialCorrectCount = 0;
    }

    const questName = await page.name.textContent;
    const picName = await page.picname.textContent;
    
    await t.click(page.firstPhoto);

    const finalCorrectCount = Number(await page.correct.textContent);

    if (questName === picName){
        //console.log('Yes');
        await t
        .expect(finalCorrectCount)
        .eql(initialCorrectCount + 1); 
    }
    else{
        //console.log('No');
        await t
        .expect(finalCorrectCount)
        .eql(initialCorrectCount);
    };
});

test('Streak counter augments if answer is correct but resets to zero if it is not', async t => {
    let initialStreakCount = Number(await page.streak.textContent);

    if (initialStreakCount === NaN){
        initialStreakCount = 0;
    }

    const questName = await page.name.textContent;
    const picName = await page.picname.textContent;
    
    await t.click(page.firstPhoto);

    const finalStreakCount = Number(await page.streak.textContent);

    if (questName === picName){
        //console.log('Yes');
        await t
        .expect(finalStreakCount)
        .eql(initialStreakCount + 1); 
    }
    else{
        //console.log('No');
        await t
        .expect(finalStreakCount)
        .eql(0);
    };    
})