import {HousesParser} from "./main";
test("main test", () =>{
    expect(new HousesParser('7/1, 11 17, 17/1, 17/2, 6-24 8/2, 15, 15/1, 15а, четные111-121,6-29 четные100+нечетные1-21').isHouseIncluded('114')).toBe(true);

    expect(new HousesParser('четные 2-28, нечетные 1-21').isHouseIncluded('6')).toBe(true);
    expect(new HousesParser('четные 2-28, нечетные 1-21').isHouseIncluded('7')).toBe(true);

    expect(new HousesParser('нечетные 11+, четные 42+').isHouseIncluded('56')).toBe(true);
    expect(new HousesParser('нечетные 11+, четные 42+').isHouseIncluded('43')).toBe(true);
    
    expect(new HousesParser('четные с 20 и вся улица до конца').isHouseIncluded('20')).toBe(true);
    expect(new HousesParser('четные с 20 и вся улица до конца').isHouseIncluded('102')).toBe(true);
    
    expect(new HousesParser('7/1, 11, 17, 17/1, 17/2, 8/2, 15, 15/1, 15а').isHouseIncluded('11')).toBe(true);
    expect(new HousesParser('7/1, 11, 17, 17/1, 17/2, 8/2, 15, 15/1, 15а').isHouseIncluded('17/2')).toBe(true);
    expect(new HousesParser('7/1, 11, 17, 17/1, 17/2, 8/2, 15, 15/1, 15а').isHouseIncluded('15а')).toBe(true);
    
    expect(new HousesParser('12, 22, 36, 42, 45, 100-106').isHouseIncluded('12')).toBe(true);
    expect(new HousesParser('12, 22, 36, 42, 45, 100-106').isHouseIncluded('105')).toBe(true);
    
    expect(new HousesParser('четные 2-28; нечетные 1-21').isHouseIncluded('17')).toBe(true);
    expect(new HousesParser('четные 2-28 нечетные 1-21').isHouseIncluded('21')).toBe(true);
    expect(new HousesParser('четные2-28нечетные1-21').isHouseIncluded('24')).toBe(true);
    expect(new HousesParser('7/1нечетные с 21 11,17 17/1,17/2,8/2,15,15/1,15ачетные 42+').isHouseIncluded('21')).toBe(true);
    expect(new HousesParser('7/1 11,17 17/1,17/2,8/2,15,15/1,15ачетные 42+').isHouseIncluded('106')).toBe(true);

    
    expect(new HousesParser('7/1, 11 17, 17/1, 17/2, 6-24 8/2, 15, 15/1, 15а, четные111-121,6-29 четные100+нечетные1-21').isHouseIncluded('115')).toBe(false);

    expect(new HousesParser('четные 2-28, нечетные 1-21').isHouseIncluded('0')).toBe(false);
    expect(new HousesParser('четные 2-28, нечетные 1-21').isHouseIncluded('30')).toBe(false);

    expect(new HousesParser('нечетные 11+, четные 42+').isHouseIncluded('10')).toBe(false);
    expect(new HousesParser('нечетные 11+, четные 42+').isHouseIncluded('9')).toBe(false);
    
    expect(new HousesParser('четные с 20 и вся улица до конца').isHouseIncluded('18')).toBe(false); 
    expect(new HousesParser('четные с 20 и вся улица до конца').isHouseIncluded('888')).toBe(false); 
    
    expect(new HousesParser('7/1, 11, 17, 17/1, 17/2, 8/2, 15, 15/1, 15а').isHouseIncluded('12')).toBe(false);
    expect(new HousesParser('7/1, 11, 17, 17/1, 17/2, 8/2, 15, 15/1, 15а').isHouseIncluded('15/')).toBe(false);
    expect(new HousesParser('7/1, 11, 17, 17/1, 17/2, 8/2, 15, 15/1, 15а').isHouseIncluded('0')).toBe(false);
    
    expect(new HousesParser('12, 22, 36, 42, 45, 100-106').isHouseIncluded('13')).toBe(false);
    expect(new HousesParser('12, 22, 36, 42, 45, 100-106').isHouseIncluded('107')).toBe(false);
    
    expect(new HousesParser('четные 2-28; нечетные 1-21').isHouseIncluded('29')).toBe(false);
    expect(new HousesParser('четные 2-28 нечетные 1-21').isHouseIncluded('0')).toBe(false);
    expect(new HousesParser('четные2-28нечетные1-21').isHouseIncluded('31')).toBe(false);
    expect(new HousesParser('7/1нечетные с 21 11,17 17/1,17/2,8/2,15,15/1,15ачетные 42+').isHouseIncluded('22')).toBe(false);
    expect(new HousesParser('7/1 11,17 17/1,17/2,8/2,15,15/1,15ачетные 42+').isHouseIncluded('17/3')).toBe(false);
});
