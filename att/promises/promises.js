function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(ms), ms)
    });
}

async function main() {
    const start = Date.now();
    const all = await Promise.all([
        delay(1000),
        delay(2000),
        delay(3000),
    ]);
    console.log(all);
    const end = Date.now();
    console.log('terminou', (end - start) / 1000 + 's');

}

main().then();