// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { Application } from './interfaces/application';
import { buildBcapsArrayIntoNavTree, getBCAPIndexfromApplication } from './utils/navigation';


describe('Navigation Tree utils', () => {
    test('getBCAPIndexFromApplication is accurate at parsing numbers', () => {
        const dummyAppA: Application = {
            id: 'test app id',
            name: 'test app',
            BCAP1: 'bcap 1',
            BCAP2: 'bcap 2',
            BCAP3: 'a sfd  2.3.5',
            spend: 2343
        }
        const dummyAppB: Application = {
            id: 'test app id',
            name: 'test app',
            BCAP1: 'bcap 1',
            BCAP2: 'bcap 2',
            BCAP3: 'a sfd  12.34.4.4.3.4.5.6',
            spend: 2343
        }
        const dummyAppC: Application = {
            id: 'test app id',
            name: 'test app',
            BCAP1: 'bcap 1',
            BCAP2: 'bcap 2',
            BCAP3: 'a sfd  55.2',
            spend: 2343
        }
    
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



