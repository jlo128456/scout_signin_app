# Scout Sign-In App - DEMO MODE GUIDE

## 🎬 DEMO Features

This is a fully functional demo of the Scout Sign-In application with non-persistent data. All data resets when you refresh or close the app.

### ✨ Key Features Added

1. **📋 Master List Tab** - Browse all scouts organized by section with quick number lookup
2. **🎓 Instructions Modal** - Shows on app startup with complete usage guide
3. **🔐 Admin PIN Protection** - Setup tab requires PIN entry for security
4. **🔢 Number-Based Lookup** - Find scouts using their master list number (1-20)
5. **💾 Non-Persistent Data** - All changes are in-memory only, no localStorage
6. **🎯 Pre-Loaded Demo Data** - 20 scouts across 4 sections + 8 leaders + schedules

---

## 📋 Master List Lookup

### Scout Numbers by Section

**Joeys (Ages 5-7):**
- #1: Tommy Wilson - 0412345601
- #2: Emma Smith - 0412345602
- #3: Liam Brown - 0412345603
- #4: Sophie Johnson - 0412345604
- #5: Oliver Davis - 0412345605

**Cubs (Ages 8-10):**
- #6: Mia Taylor - 0412345606
- #7: Lucas Martinez - 0412345607
- #8: Ava Anderson - 0412345608
- #9: Noah Thompson - 0412345609
- #10: Isabella Garcia - 0412345610

**Scouts (Ages 11-14):**
- #11: Ethan Moore - 0412345611
- #12: Olivia Jackson - 0412345612
- #13: Mason White - 0412345613
- #14: Charlotte Lee - 0412345614
- #15: Lucas Harris - 0412345615

**Venturers (Ages 15-17):**
- #16: Samuel Martin - 0412345616
- #17: Grace Robinson - 0412345617
- #18: Benjamin Clark - 0412345618
- #19: Amelia Rodriguez - 0412345619
- #20: Jack Lewis - 0412345620

---

## 🔐 Admin Access

### Admin PIN: `1234`

When you click the Setup tab, you'll be prompted for the admin PIN.

**What you can do in Setup:**
- Manage scouts and leaders
- Import data from CSV
- Configure sections
- Add announcements
- Block problematic parents

---

## 🎯 How to Use Each Tab

### 1. **Sign-In Tab** 📱
Primary interface for signing scouts in and out.

**Steps:**
1. Enter the last 9 digits of a parent's phone number
2. System finds the child associated with that number
3. Click "Sign In" when child arrives
4. Click "Sign Out" when child leaves and select guardian

**Features:**
- See all leaders on duty
- View current section name
- Quick-add children not in the list
- Blocked parent warnings

### 2. **Master List Tab** 📋
Browse and search all scouts by number.

**Usage:**
- Filter by section (All, Joeys, Cubs, Scouts, Venturers)
- Click a scout number to see details
- Use "Quick Sign-In" button to go to Sign-In tab with that scout selected

### 3. **Roster Tab** 👥
View all registered scouts and leaders.

**Shows:**
- Scout name and scout name
- Member numbers
- Section assignments
- Leader details

### 4. **Log Tab** 📊
Real-time attendance records.

**Displays:**
- Sign-in times
- Sign-out information
- Guardian who picked up
- Attendance summaries

### 5. **Setup Tab** ⚙️ (Admin Only)
Configuration and management.

**Requires PIN:** 1234

**Features:**
- Add/edit scouts and leaders
- Import CSV roster data
- Configure active section
- Add announcements
- Block parents if needed

---

## 💡 Demo Data Overview

### Pre-Loaded Content
- **20 Scouts** across 4 sections
- **8 Leaders** with duty assignments
- **4 Schedule Entries** for different sections
- **3 Announcements** in the system

### Phone Numbers
All demo phone numbers follow the pattern: `0412345###`
- Last 3 digits: 601-620 for scouts
- Last 3 digits: 750-757 for leaders

### Guardian Names
Each scout has 1-2 assigned guardians for sign-out selection.

---

## 🎮 Demo Scenarios to Try

### Scenario 1: Basic Sign-In/Sign-Out
1. Go to Sign-In tab
2. Enter "345601" (Tommy Wilson's phone)
3. Click "Sign In"
4. Click "Sign Out" and select "Sarah Wilson"
5. See the log updated

### Scenario 2: Using Master List
1. Go to Master List tab
2. Filter by "Cubs"
3. Click scout #7 (Lucas Martinez)
4. Click "Quick Sign-In This Scout"
5. You're now on Sign-In tab with Lucas pre-selected

### Scenario 3: Admin Access
1. Click Setup tab
2. Enter PIN: 1234
3. Manage scouts, leaders, and settings
4. Add announcements or block a parent
5. Changes persist until you refresh

### Scenario 4: Add New Scout
1. On Sign-In tab, click "Child Not Listed?"
2. Enter name: "Test Scout"
3. Enter phone: "0412345999"
4. Click "Add & Sign In"
5. New scout is added and signed in

### Scenario 5: Reset Data
1. Refresh the page (F5 or Cmd+R)
2. All data reverts to demo defaults
3. Instructions modal appears again

---

## 🔑 Key Points to Remember

- ✅ **No Login Required** - App runs immediately with demo data
- ✅ **No Internet Needed** - All data is stored in memory
- ✅ **No Data Persistence** - Perfect for safe testing
- ✅ **Complete Feature Set** - Includes all main functionality
- ✅ **Multiple Sections** - Test different scout age groups
- ✅ **Admin Protected** - Setup requires PIN entry
- ✅ **Rich Demo Data** - Enough variety to explore thoroughly

---

## 🆘 Troubleshooting

### "Scout not found" message
- Make sure you entered the last 9 digits of the phone correctly
- Try using the Master List tab to find the scout's exact number
- Use Quick Add to add them if they're missing

### Can't access Setup tab
- The Setup tab requires admin PIN
- Enter `1234` when prompted
- Check the Instructions modal for the hint

### Data disappeared
- This is normal! Demo data is non-persistent
- Refresh the page to reload demo data
- No data is saved to localStorage

### Phone number format issues
- Enter just the last 9 digits (e.g., "412345601")
- The app will find matches with partial numbers
- See Master List for all available numbers

---

## 📞 Demo Phone Numbers Quick Reference

**Quick Copy-Paste:**
```
Tommy Wilson: 0412345601
Emma Smith: 0412345602
Liam Brown: 0412345603
Sophie Johnson: 0412345604
Oliver Davis: 0412345605
Mia Taylor: 0412345606
Lucas Martinez: 0412345607
Ava Anderson: 0412345608
Noah Thompson: 0412345609
Isabella Garcia: 0412345610
Ethan Moore: 0412345611
Olivia Jackson: 0412345612
Mason White: 0412345613
Charlotte Lee: 0412345614
Lucas Harris: 0412345615
Samuel Martin: 0412345616
Grace Robinson: 0412345617
Benjamin Clark: 0412345618
Amelia Rodriguez: 0412345619
Jack Lewis: 0412345620
```

---

## 🎉 Enjoy the Demo!

This demo is designed to let you safely explore all features without any data persistence concerns. Perfect for training, testing, or showcasing the system to stakeholders.

**Need to Reset?** Just refresh the page!
**Want Instructions Again?** Click the "Show Instructions" button anytime!
