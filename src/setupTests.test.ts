// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { Application } from './interfaces/application';
import { filterApplicationsByBCap } from './utils/application';
import { buildBcapsArrayIntoNavTree, getBCAPIndexfromApplication } from './utils/navigation';

const dummyAppA: Application = {
    id: 'id1',
    name: 'test app',
    BCAP1: 'bcap 1',
    BCAP2: 'bcap 2',
    BCAP3: 'a sfd  2.3.5',
    spend: 2343
}
const dummyAppB: Application = {
    id: 'id2',
    name: 'test app',
    BCAP1: 'bcap 1',
    BCAP2: 'bcap 2',
    BCAP3: 'a sfd  12.34.4.4.3.4.5.6',
    spend: 2343
}
const dummyAppC: Application = {
    id: 'id3',
    name: 'test app',
    BCAP1: 'bcap 1',
    BCAP2: 'bcap 2',
    BCAP3: 'a sfd  55.2',
    spend: 2343
}
const dummyAppD: Application = {
    id: 'id4',
    name: 'test app',
    BCAP1: 'bcap 1',
    BCAP2: 'bcap 2',
    BCAP3: 'a sfd  55.5',
    spend: 2343
}
const dummyAppE: Application = {
    id: 'id5',
    name: 'test app',
    BCAP1: 'bcap 1',
    BCAP2: 'bcap 2',
    BCAP3: 'a sfd  5.12',
    spend: 2343
}

describe('Navigation Tree utils', () => {
    test('getBCAPIndexFromApplication is accurate at parsing numbers', () => {   
        expect(getBCAPIndexfromApplication(dummyAppA)).toStrictEqual([2,3,5]);
        expect(getBCAPIndexfromApplication(dummyAppB)).toStrictEqual([12,34,4,4,3,4,5,6]);
        expect(getBCAPIndexfromApplication(dummyAppC)).toStrictEqual([55,2])
    })

    test('buildBcapsArrayIntoNavTree is accurate in ordering multiedimensional arrays', () => {
        const dummyBcaps = [
            [2,3,5],
            [10,22,4,6,7],
            [1],
            [2,3,20],
        ]

        const navTreeOfBcaps = buildBcapsArrayIntoNavTree(dummyBcaps);
        // Checks both order and arbitrary amount of depths (line 2 has 5 elements and like 3 has 1, but they organise correctly)
        expect(navTreeOfBcaps).toStrictEqual([
            {
                title: "1",
                children: []
            },
            {
                title: "2",
                children: [
                    {
                        title: "3",
                        children: [
                            {
                                title: "5",
                                children: []
                            },
                            {
                                title: "20",
                                children: []
                            }
                        ]                           
                    }
                ]
            },
            {
                title: "10",
                children: [
                    {
                        title: "22",
                        children: [
                            {
                                title: "4",
                                children: [
                                    {
                                        title: "6",
                                        children: [
                                            {
                                                title: "7",
                                                children: []
                                            }
                                        ] 
                                    }
                                ]
                            }
                        ]                           
                    }
                ]
            },
        ])
    })
})

describe('Application Viewer utils', () => {
   test('filterApplicationsByBCap is accurate', () => {
       const combinedBCaps = [
           dummyAppA,
           dummyAppB,
           dummyAppC,
           dummyAppD,
           dummyAppE,
       ]
       
       expect(filterApplicationsByBCap(combinedBCaps, '2').map((n) => n.id)).toStrictEqual(['id1'])
       expect(filterApplicationsByBCap(combinedBCaps, '12.34.4').map((n) => n.id)).toStrictEqual(['id2'])
       expect(filterApplicationsByBCap(combinedBCaps, '12.34.7').map((n) => n.id)).toStrictEqual([])
       expect(filterApplicationsByBCap(combinedBCaps, '55').map((n) => n.id)).toStrictEqual(['id3', 'id4'])
       expect(filterApplicationsByBCap(combinedBCaps, '5').map((n) => n.id)).toStrictEqual(['id5'])
   })
})

