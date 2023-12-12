import prisma from '../lib/prismadb.js'
import chalk from 'chalk'
import moment from 'moment'

//FIND ALL

export const OsszesDolgozat = async(req, res) => {
  const result = await prisma.zarodolgozat.findMany();

  console.log(`${chalk.bgWhite.black(' MYSQL FIND-ALL ')} Sikeresen lekérdezve ${chalk.bgRed(` ${result.length} `)} záródolgozat.`);
  res.send(result);
}

//FIND BY ID

export const DogaById = async(req, res) => {
  const { id } = req.params;

  const result = await prisma.zarodolgozat.findUnique({ where: { id: parseInt(id) } });

  if (!result) {
    return res.send({ msg: 'A megadott ID-vel nem létezik rekord!' });
  }

  console.log(`${chalk.bgWhite.black(' MYSQL FIND-ALL ')} Sikeresen lekérdezve a(z) ${chalk.bgRed(` ${id} `)} ID-vel rendelkező záródolgozat.`);
  res.send(result);
}

//CREATE

export const CreateDolgozat = async(req, res) => {
  const { nev, zdcim, rleiras, leadasidatum, konzulensnev, ertekeles } = req.body;

  if (!nev || !zdcim || !rleiras || !leadasidatum || !konzulensnev || !ertekeles) {
    return res.send('Hiányos / hibás adatok!');
  }

  await prisma.zarodolgozat.create({ data: {
    nev, zarodolgozatcim: zdcim, rovidleiras: rleiras, leadasidatum: (new Date(leadasidatum)), konzulensnev, ertekeles
  } });

  console.log(`${chalk.bgWhite.black(' MYSQL CREATE ')} Új záródolgozat létrehozva ezekkel az adatokkal:
  ├─── Név: ${chalk.blue(nev)}
  ├─── Záródolgozat cím: ${chalk.blue(zdcim)}
  ├─── Rövid leírás: ${chalk.blue(rleiras)}
  ├─── Leadási dátum: ${chalk.blue(leadasidatum)}
  ├─── Konzulens név: ${chalk.blue(konzulensnev)}
  └─── Értékelés: ${chalk.blue(ertekeles)}`);
  res.send({ msg: 'Záródolgozat sikeresen hozzáadva!' });
}

//DELETE

export const DeleteDolgozat = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.send({ msg: 'Egy ID szükséges a dolgozat törléséhez!' });
  }

  try {
    await prisma.zarodolgozat.delete({ where: { id: parseInt(id) } });

    console.log(`${chalk.bgWhite.black(' MYSQL DELETE ')} Sikeresen törölve a(z) ${chalk.bgRed(` ${id} `)} ID-vel rendelkező záródolgozat.`);
    res.send({ msg: `${id} ID-vel rendelkező dolgozat sikeresen törölve!` });
  } catch (e) {
    res.send({ msg: 'A(z) ' + id + ' ID-vel rendelkező elem nem létezik.' });
  }
}

// UPDATE

export const UpdateDolgozat = async(req, res) => {
  const { id } = req.params;
  let { nev, zdcim, rleiras, leadasidatum, konzulensnev, ertekeles } = req.body;
  const changed = [];

  if (!id) {
    return res.send({ msg: 'A módosításhoz adj meg egy ID-t.' });
  }
  const result = await prisma.zarodolgozat.findUnique({ where: { id: parseInt(id) } });
  if (!result) {
    return res.send({ msg: 'A megadott ID-vel nem létezik záródolgozat.' });
  }
  if (!nev) nev = result.nev; else changed.push('nev');
  if (!zdcim) zdcim = result.zdcim; else changed.push('zarodolgozatcim');
  if (!rleiras) rleiras = result.rovidleiras; else changed.push('rovidleiras');
  if (!leadasidatum) leadasidatum = result.leadasidatum; else changed.push('leadasidatum');
  if (!konzulensnev) konzulensnev = result.konzulensnev; else changed.push('konzulensnev');
  if (!ertekeles) ertekeles = result.ertekeles; else changed.push('ertekeles');

  try {
    await prisma.zarodolgozat.update({ data: {
      nev: nev,
      zarodolgozatcim: zdcim,
      rovidleiras: rleiras,
      leadasidatum: new Date(leadasidatum),
      konzulensnev,
      ertekeles
    }, where: { id: parseInt(id) } });

    console.log(`${chalk.bgWhite.black(' MYSQL UPDATE ')} Sikeresen módosítva ${chalk.bgRed(` ${id} `)} ID-vel rendelkező elem.\n  └─── Módosított mezők: [${chalk.blue(changed.join(', '))}  ]`);
    res.send({ msg: id + ' ID-vel rendelkező záródolgozat adatai sikeresen módosítva!' });
  } catch (e) {
    res.send({ msg: 'Valami hiba történt futtatáskor!', error: e });
  }
}