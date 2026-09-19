// Demo Master List - Non-persistent demo data
export const DEMO_DATA = {
  children: [
    // Joeys (Ages 5-7)
    { id: 1, name: 'Tommy Wilson', phone: '0412345601', section: 'Joeys', scoutName: 'Koala', memberNumber: 'JY001', guardians: ['Sarah Wilson', 'John Wilson'] },
    { id: 2, name: 'Emma Smith', phone: '0412345602', section: 'Joeys', scoutName: 'Kookaburra', memberNumber: 'JY002', guardians: ['Lisa Smith', 'Mike Smith'] },
    { id: 3, name: 'Liam Brown', phone: '0412345603', section: 'Joeys', scoutName: 'Wombat', memberNumber: 'JY003', guardians: ['Angela Brown'] },
    { id: 4, name: 'Sophie Johnson', phone: '0412345604', section: 'Joeys', scoutName: 'Kangaroo', memberNumber: 'JY004', guardians: ['Patricia Johnson', 'Robert Johnson'] },
    { id: 5, name: 'Oliver Davis', phone: '0412345605', section: 'Joeys', scoutName: 'Possum', memberNumber: 'JY005', guardians: ['Jennifer Davis'] },

    // Cubs (Ages 8-10)
    { id: 6, name: 'Mia Taylor', phone: '0412345606', section: 'Cubs', scoutName: 'Kelpie', memberNumber: 'CB001', guardians: ['Margaret Taylor', 'David Taylor'] },
    { id: 7, name: 'Lucas Martinez', phone: '0412345607', section: 'Cubs', scoutName: 'Dingo', memberNumber: 'CB002', guardians: ['Rosa Martinez'] },
    { id: 8, name: 'Ava Anderson', phone: '0412345608', section: 'Cubs', scoutName: 'Wombat', memberNumber: 'CB003', guardians: ['Karen Anderson', 'James Anderson'] },
    { id: 9, name: 'Noah Thompson', phone: '0412345609', section: 'Cubs', scoutName: 'Echidna', memberNumber: 'CB004', guardians: ['Susan Thompson'] },
    { id: 10, name: 'Isabella Garcia', phone: '0412345610', section: 'Cubs', scoutName: 'Tasmanian Devil', memberNumber: 'CB005', guardians: ['Carmen Garcia', 'Antonio Garcia'] },

    // Scouts (Ages 11-14)
    { id: 11, name: 'Ethan Moore', phone: '0412345611', section: 'Scouts', scoutName: 'Ranger', memberNumber: 'SC001', guardians: ['Patricia Moore'] },
    { id: 12, name: 'Olivia Jackson', phone: '0412345612', section: 'Scouts', scoutName: 'Scout Leader', memberNumber: 'SC002', guardians: ['Mary Jackson', 'Peter Jackson'] },
    { id: 13, name: 'Mason White', phone: '0412345613', section: 'Scouts', scoutName: 'Tracker', memberNumber: 'SC003', guardians: ['Linda White'] },
    { id: 14, name: 'Charlotte Lee', phone: '0412345614', section: 'Scouts', scoutName: 'Pioneer', memberNumber: 'SC004', guardians: ['Margaret Lee', 'Thomas Lee'] },
    { id: 15, name: 'Lucas Harris', phone: '0412345615', section: 'Scouts', scoutName: 'Explorer', memberNumber: 'SC005', guardians: ['Christine Harris'] },

    // Venturers (Ages 15-17)
    { id: 16, name: 'Samuel Martin', phone: '0412345616', section: 'Venturers', scoutName: 'Venturer Lead', memberNumber: 'VR001', guardians: ['Patricia Martin'] },
    { id: 17, name: 'Grace Robinson', phone: '0412345617', section: 'Venturers', scoutName: 'Guide', memberNumber: 'VR002', guardians: ['Elizabeth Robinson', 'William Robinson'] },
    { id: 18, name: 'Benjamin Clark', phone: '0412345618', section: 'Venturers', scoutName: 'Navigator', memberNumber: 'VR003', guardians: ['Nancy Clark'] },
    { id: 19, name: 'Amelia Rodriguez', phone: '0412345619', section: 'Venturers', scoutName: 'Pathfinder', memberNumber: 'VR004', guardians: ['Maria Rodriguez', 'Carlos Rodriguez'] },
    { id: 20, name: 'Jack Lewis', phone: '0412345620', section: 'Venturers', scoutName: 'Leader', memberNumber: 'VR005', guardians: ['Sandra Lewis'] },
  ],

  leaders: [
    { id: 101, name: 'Sarah Miller', phone: '0412345750', section: 'Joeys', scoutName: 'Joey Leader', onDuty: true },
    { id: 102, name: 'Mark Peterson', phone: '0412345751', section: 'Joeys', scoutName: 'Joey Mentor', onDuty: true },
    { id: 103, name: 'Jessica Chen', phone: '0412345752', section: 'Cubs', scoutName: 'Cub Scout Master', onDuty: true },
    { id: 104, name: 'Andrew Thompson', phone: '0412345753', section: 'Cubs', scoutName: 'Cub Assistant', onDuty: true },
    { id: 105, name: 'Rebecca Walsh', phone: '0412345754', section: 'Scouts', scoutName: 'Scout Master', onDuty: true },
    { id: 106, name: 'Christopher Bond', phone: '0412345755', section: 'Scouts', scoutName: 'Patrol Leader', onDuty: true },
    { id: 107, name: 'Victoria Hart', phone: '0412345756', section: 'Venturers', scoutName: 'Venturer Scout Master', onDuty: true },
    { id: 108, name: 'Daniel Price', phone: '0412345757', section: 'Venturers', scoutName: 'Venturer Mentor', onDuty: false },
  ],

  attendance: {},

  schedule: [
    { date: '2024-09-21', section: 'Joeys', activity: 'Campfire and Games', time: '10:00 AM' },
    { date: '2024-09-21', section: 'Cubs', activity: 'Nature Walk', time: '2:00 PM' },
    { date: '2024-09-28', section: 'Scouts', activity: 'Rock Climbing', time: '9:00 AM' },
    { date: '2024-10-05', section: 'Venturers', activity: 'Community Service', time: '1:00 PM' },
  ],

  announcements: [
    { id: 1, text: '🎉 Welcome to Scout Sign-In Demo! All data resets when you close the app.' },
    { id: 2, text: '⭐ Try searching by phone number from the master list to find scouts quickly!' },
    { id: 3, text: '👥 Use the admin PIN to manage scouts and leaders.' },
  ],

  currentSection: 'Joeys',
  blockedParents: [],
};

// Master List indexed by number for quick lookup
export const MASTER_LIST_BY_NUMBER = {
  '1': { number: 1, name: 'Tommy Wilson', section: 'Joeys', phone: '0412345601', childId: 1 },
  '2': { number: 2, name: 'Emma Smith', section: 'Joeys', phone: '0412345602', childId: 2 },
  '3': { number: 3, name: 'Liam Brown', section: 'Joeys', phone: '0412345603', childId: 3 },
  '4': { number: 4, name: 'Sophie Johnson', section: 'Joeys', phone: '0412345604', childId: 4 },
  '5': { number: 5, name: 'Oliver Davis', section: 'Joeys', phone: '0412345605', childId: 5 },
  '6': { number: 6, name: 'Mia Taylor', section: 'Cubs', phone: '0412345606', childId: 6 },
  '7': { number: 7, name: 'Lucas Martinez', section: 'Cubs', phone: '0412345607', childId: 7 },
  '8': { number: 8, name: 'Ava Anderson', section: 'Cubs', phone: '0412345608', childId: 8 },
  '9': { number: 9, name: 'Noah Thompson', section: 'Cubs', phone: '0412345609', childId: 9 },
  '10': { number: 10, name: 'Isabella Garcia', section: 'Cubs', phone: '0412345610', childId: 10 },
  '11': { number: 11, name: 'Ethan Moore', section: 'Scouts', phone: '0412345611', childId: 11 },
  '12': { number: 12, name: 'Olivia Jackson', section: 'Scouts', phone: '0412345612', childId: 12 },
  '13': { number: 13, name: 'Mason White', section: 'Scouts', phone: '0412345613', childId: 13 },
  '14': { number: 14, name: 'Charlotte Lee', section: 'Scouts', phone: '0412345614', childId: 14 },
  '15': { number: 15, name: 'Lucas Harris', section: 'Scouts', phone: '0412345615', childId: 15 },
  '16': { number: 16, name: 'Samuel Martin', section: 'Venturers', phone: '0412345616', childId: 16 },
  '17': { number: 17, name: 'Grace Robinson', section: 'Venturers', phone: '0412345617', childId: 17 },
  '18': { number: 18, name: 'Benjamin Clark', section: 'Venturers', phone: '0412345618', childId: 18 },
  '19': { number: 19, name: 'Amelia Rodriguez', section: 'Venturers', phone: '0412345619', childId: 19 },
  '20': { number: 20, name: 'Jack Lewis', section: 'Venturers', phone: '0412345620', childId: 20 },
};

export const ADMIN_PIN = '1234';
