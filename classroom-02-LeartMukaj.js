// Mock Twitter Users Data
const mockUsers = [
	{
		name: 'Elon Musk',
		username: 'elonmusk',
		description: 'CEO of Tesla, SpaceX, and X',
		public_metrics: {
			followers_count: 150000000,
			following_count: 500,
			tweet_count: 45000
		},
		profile_image_url: 'https://pbs.twimg.com/profile_images/1445764532/elon_normal.jpeg'
	},
	{
		name: 'Taylor Swift',
		username: 'taylorswift13',
		description: 'Grammy Award-winning Singer',
		public_metrics: {
			followers_count: 98000000,
			following_count: 350,
			tweet_count: 28000
		},
		profile_image_url: 'https://pbs.twimg.com/profile_images/1445850001/ts_normal.jpg'
	},
	{
		name: 'Barack Obama',
		username: 'BarackObama',
		description: '44th President of the United States',
		public_metrics: {
			followers_count: 135000000,
			following_count: 600,
			tweet_count: 15000
		},
		profile_image_url: 'https://pbs.twimg.com/profile_images/1445856001/obama_normal.jpg'
	}
];

// Fetch Twitter Users on Page Load
$(document).ready(function () {
	fetchTwitterUsers();
});

// Function to fetch Twitter users (using mock data)
function fetchTwitterUsers() {
	// Simulate API delay
	setTimeout(function () {
		console.log('Using mock Twitter users data');
		displayUsers(mockUsers);
		$('#loadingSpinner').hide();
	}, 1000);
}

// Function to display users
function displayUsers(data) {
	const usersContainer = $('#usersContainer');
	usersContainer.html(''); // Clear existing content

	// Handle different response formats
	const users = data.data || data || [];
	const userArray = Array.isArray(users) ? users : [users];

	if (userArray.length === 0) {
		usersContainer.html('<div class="col-12"><p class="text-center text-muted">No users found.</p></div>');
		return;
	}

	// Display each user as a card
	userArray.forEach(user => {
		const userCard = createUserCard(user);
		usersContainer.append(userCard);
	});
}

// Function to create a user card
function createUserCard(user) {
	const name = user.name || 'Unknown';
	const username = user.username || 'N/A';
	const description = user.description || 'No description available';
	const followers = user.public_metrics?.followers_count || 0;
	const following = user.public_metrics?.following_count || 0;
	const tweets = user.public_metrics?.tweet_count || 0;
	const profileImage = user.profile_image_url || '';

	const card = `
		<div class="col-md-4 mb-4">
			<div class="card h-100">
				${profileImage ? `<img src="${profileImage}" class="card-img-top" alt="${name}">` : ''}
				<div class="card-body">
					<h5 class="card-title">${name}</h5>
					<p class="card-text text-muted">@${username}</p>
					<p class="card-text">${description}</p>
					<div class="row text-center">
						<div class="col">
							<strong>${followers}</strong>
							<p class="text-muted small">Followers</p>
						</div>
						<div class="col">
							<strong>${following}</strong>
							<p class="text-muted small">Following</p>
						</div>
						<div class="col">
							<strong>${tweets}</strong>
							<p class="text-muted small">Tweets</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;

	return card;
}

// Function to show error message
function showError(message) {
	const errorDiv = $('#errorMessage');
	errorDiv.text(message);
	errorDiv.show();
}
