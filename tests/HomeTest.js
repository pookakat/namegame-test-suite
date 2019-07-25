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
    const count = await picNames.count;
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

    let finalAttemptsCount = Number(await page.attempts.textContent);
    if (finalAttemptsCount === NaN){
        finalAttemptsCount = 0;
    }

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
    const picName = await page.firstPhoto.textContent;

    await t.click(page.firstPhoto);

    let finalCorrectCount = Number(await page.correct.textContent);
    if (finalCorrectCount === NaN){
        finalCorrectCount = 0;
    }

    //This function was still thowing NaN for one of the values. I created this log to let me know whether this was still occurring.
    //console.log(initialCorrectCount, typeof initialCorrectCount, finalCorrectCount, typeof finalCorrectCount);

    if (questName === picName){
        //console.log('Right Answer');
        await t
        .expect(finalCorrectCount)
        .eql(initialCorrectCount + 1); 
    }
    else{
        //console.log('Wrong Answer');
        await t
        .expect(finalCorrectCount)
        .eql(initialCorrectCount);
    };
});

test('Streak counter increments if answer is correct but resets to zero if it is not', async t => {
    let initialStreakCount = Number(await page.streak.textContent);

    if (initialStreakCount === NaN){
        initialStreakCount = 0;
    }

    const questName = await page.name.textContent;
    const picName = await page.firstPhoto.textContent;

    await t.click(page.firstPhoto);

    let finalStreakCount = Number(await page.streak.textContent);
    if (finalStreakCount === NaN){
        finalStreakCount = 0;
    }

    if (questName === picName){
        //console.log('Right Answer');
        await t
        .expect(finalStreakCount)
        .eql(initialStreakCount + 1); 
    }
    else{
        //console.log('Wrong Answer');
        await t
        .wait(500)
        .expect(finalStreakCount)
        .eql(0);
    };    
});

test('Box style acts correctly on a right vs a wrong answer', async t => {
    const questName = await page.name.textContent;
    const picName = await page.firstPhoto.textContent;
    
    await t.click(page.firstPhoto);
    await t.wait(500);

    if (questName === picName){
        //console.log('Right Answer');
        const correct = await page.correct.exists;
        await t
        .expect(correct)
        .ok(); 
    }
    else{
        //console.log('Wrong Answer');
        const incorrect = await page.wrong.exists;
        await t
        .expect(incorrect)
        .ok();
    };     
});

test('Verify that a new name and set of pictures are selected after a right answer', async t =>{
    const firstQuestName = await page.name.textContent;
    const picNames = page.picname;
    const count = await picNames.count;
    const namesArray = [];
    //These comments is how I tested a known correct test
    //const correct = await page.firstPhoto.withText(firstQuestName);
    const firstPicName = await page.firstPhoto.find('.name').textContent;
    //const firstPicName = await correct.find('.name').textContent;

    for (var i = 0; i < count; i++) {
        let nameTested = await picNames.nth(i).textContent;
        //console.log(nameTested);
        namesArray.push(nameTested);
    }

    //await t.click(correct);
    await t.click(page.firstPhoto);
    await t.wait(3500);
    await t.load;
    const questName = await page.name.textContent;
    const newNamesArray = [];

    for (var i = 0; i < count; i++) {
        let nameTested = await picNames.nth(i).textContent;
        //console.log(nameTested);
        newNamesArray.push(nameTested);
    }

    if (firstQuestName === firstPicName){
    await t
        .expect(questName)
        .notEql(firstQuestName)
        .expect(namesArray)
        .notEql(newNamesArray);
        //console.log(questName, firstQuestName);
        //console.log(namesArray, newNamesArray);
    }
    else{
        await t
        .expect(questName)
        .eql(firstQuestName)
        .expect(namesArray)
        .eql(newNamesArray);
        //console.log(questName, firstQuestName);
        //console.log(namesArray, newNamesArray);
    }
})