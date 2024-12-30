import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Animated,
    Dimensions,
    FlatList,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { PinchGestureHandler, PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const MapScreen = () => {
    const navigation = useNavigation();
    const [isHamburgerVisible, setIsHamburgerVisible] = useState(false);
    const [isMapTypeModalVisible, setIsMapTypeModalVisible] = useState(false);
    const [isCompassModalVisible, setIsCompassModalVisible] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const slideAnim = useRef(new Animated.Value(-width)).current;
    const scale = useRef(new Animated.Value(1.5)).current;
    const offsetX = useRef(new Animated.Value(0)).current;
    const offsetY = useRef(new Animated.Value(0)).current;

    const onPinchEvent = Animated.event(
        [{ nativeEvent: { scale } }],
        { useNativeDriver: true }
    );

    const onPinchStateChange = (event) => {
        if (event.nativeEvent.state === 5) {
            // Pinch gesture has ended
            Animated.spring(scale, {
                toValue: Math.max(1.5, Math.min(scale._value, 3)), // Set the zoom range from 1.5 to 3
                useNativeDriver: true,
            }).start();
        }
    };

    const onPanEvent = Animated.event(
        [{ nativeEvent: { translationX: offsetX, translationY: offsetY } }],
        { useNativeDriver: true }
    );

    const toggleHamburgerMenu = () => {
        if (!isHamburgerVisible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsHamburgerVisible(true));
        } else {
            Animated.timing(slideAnim, {
                toValue: -width,
                duration: 300,
                useNativeDriver: true,
            }).start(() => setIsHamburgerVisible(false));
        }
    };

    const buildings = [
        { name: 'Academic Departments', subBuildings: ['COF', 'CHMT', 'CFND', 'CBAA', 'CAS', 'CCS', 'CTE', 'CCJE', 'Senior High School'] },
        { name: 'Administrative Buildings', subBuildings: ['Gender And Development (GAD) Office', 'University Clinic', 'Tahanan ng Alumni', 'Office of the Faculty Regent/Office of the Presidential Media Affair', 'OSAS Building', 'Office of the University President', 'University Boardroom', 'Business Affairs Office (BAO)', 'Security House', 'Extension and Training Services (ETS)', 'National Service Training Program (NSTP) Office', 'Reserve Officers Training Corps (ROTC) Office', 'Guesthouse', 'Cafe By the Bay', 'PE Department + Sport & Cultural Office', 'Admin Building'] },
        { name: 'Miscellaneous', subBuildings: ['Lacson Gymnasium', 'Joey-Lina Gymnasium', 'Lajara Court', 'University Clinic', 'University Canteen', 'Guard House'] },
        { name: 'Food Places', subBuildings: ['Cafe EuPOURia', 'We Deliver', 'Pink House', 'Lemonade Stand', 'Ice-cream Stand', 'Siomai Stand', 'Popcorn Stand', 'Polyteacs', 'Cafe By the Bay'] },
        { name: 'Others', subBuildings: ['Student Center', 'Seating Spots', 'Comfort Rooms (CR)'] },
    ];

    const toggleDropdown = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null); // Close the dropdown if the same item is clicked again
        } else {
            setExpandedIndex(index); // Open the clicked item
        }
    };

    const navigateToSettings = () => {
        navigation.navigate('Settings');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Gesture Handler for Pinch Zoom and Pan */}
            <GestureHandlerRootView style={styles.container}>
                <PinchGestureHandler
                    onGestureEvent={onPinchEvent}
                    onHandlerStateChange={onPinchStateChange}
                >
                    <Animated.View style={styles.mapImageContainer}>
                        <PanGestureHandler onGestureEvent={onPanEvent}>
                            <Animated.View
                                style={[
                                    styles.mapImageWrapper,
                                    {
                                        transform: [
                                            { scale: scale }, // Pinch to zoom scale
                                            { translateX: offsetX }, // X offset for dragging
                                            { translateY: offsetY }, // Y offset for dragging
                                        ],
                                    },
                                ]}
                            >
                                <Image
                                    source={require('../assets/map.jpg')}
                                    style={styles.mapImage}
                                    resizeMode="contain"
                                />
                            </Animated.View>
                        </PanGestureHandler>
                    </Animated.View>
                </PinchGestureHandler>
            </GestureHandlerRootView>

            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <FontAwesome name="search" size={20} color="#808080" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#808080"
                />
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomNavContainer}>
                <View style={styles.navOverlay} />
                <TouchableOpacity style={styles.navButton} onPress={toggleHamburgerMenu}>
                    <Image source={require('../assets/list.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setIsMapTypeModalVisible(!isMapTypeModalVisible)}
                >
                    <Image source={require('../assets/apps.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.avatarContainer}>
                    <Image source={require('../assets/Assistant.png')} style={styles.avatar} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setIsCompassModalVisible(!isCompassModalVisible)}
                >
                    <Image source={require('../assets/compass.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Image source={require('../assets/circle.png')} style={styles.navIcon} />
                </TouchableOpacity>
            </View>

            {/* Map Type Modal */}
            {isMapTypeModalVisible && (
                <View style={styles.mapTypeModal}>
                    <View style={styles.mapTypeRow}>
                        <TouchableOpacity
                            style={styles.mapTypeButton}
                            onPress={() => {
                                setMapType('standard');
                                setIsMapTypeModalVisible(false);
                            }}
                        >
                            <Image source={require('../assets/hybrid.png')} style={styles.mapTypeImage} />
                            <Text style={styles.mapTypeText}>Default</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.mapTypeButton}
                            onPress={() => {
                                setMapType('none');
                                setIsMapTypeModalVisible(false);
                            }}
                        >
                            <Image source={require('../assets/hybrid.png')} style={styles.mapTypeImage} />
                            <Text style={styles.mapTypeText}>Flat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mapTypeRow}>
                        <TouchableOpacity
                            style={styles.mapTypeButton}
                            onPress={() => {
                                setMapType('terrain');
                                setIsMapTypeModalVisible(false);
                            }}
                        >
                            <Image source={require('../assets/hybrid.png')} style={styles.mapTypeImage} />
                            <Text style={styles.mapTypeText}>Terrain</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.mapTypeButton}
                            onPress={() => {
                                setMapType('satellite');
                                setIsMapTypeModalVisible(false);
                            }}
                        >
                            <Image source={require('../assets/flat.png')} style={styles.mapTypeImage} />
                            <Text style={styles.mapTypeText}>Satellite</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            )}

            {isCompassModalVisible && (
                <View style={[styles.mapTypeModal, styles.compassModalRight]}>
                    <View style={styles.mapTypeRow}>
                        <TouchableOpacity
                            style={styles.mapTypeButton}
                            onPress={() => {
                                console.log('LBC selected');
                                setIsCompassModalVisible(false);
                            }}
                        >
                            <Image source={require('../assets/hybrid.png')} style={styles.mapTypeImage} />
                            <Text style={styles.mapTypeText}>LBC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.mapTypeButton}
                            onPress={() => {
                                console.log('SCC selected');
                                setIsCompassModalVisible(false);
                            }}
                        >
                            <Image source={require('../assets/hybrid.png')} style={styles.mapTypeImage} />
                            <Text style={styles.mapTypeText}>SCC</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.mapTypeRow}>
                        <TouchableOpacity
                            style={styles.mapTypeButton}
                            onPress={() => {
                                console.log('SPCC selected');
                                setIsCompassModalVisible(false);
                            }}
                        >
                            <Image source={require('../assets/hybrid.png')} style={styles.mapTypeImage} />
                            <Text style={styles.mapTypeText}>SPCC</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.mapTypeButton}
                            onPress={() => {
                                console.log('SC selected');
                                setIsCompassModalVisible(false);
                            }}
                        >
                            <Image source={require('../assets/hybrid.png')} style={styles.mapTypeImage} />
                            <Text style={styles.mapTypeText}>SC</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Hamburger Menu */}
            {isHamburgerVisible && (
                <Animated.View style={[styles.hamburgerMenu, { transform: [{ translateX: slideAnim }] }]}>
                    <View style={styles.hamburgerHeader}>
                        <TouchableOpacity style={styles.backButtonContainer} onPress={toggleHamburgerMenu}>
                            <Image source={require('../assets/back.png')} style={styles.backButton} />
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                        <Text style={styles.hamburgerTitle}>Buildings Categories</Text>
                    </View>

                    {/* Scrollable Content */}
                    <View style={styles.hamburgerContent}>
                        <FlatList
                            data={buildings}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View>
                                    <TouchableOpacity
                                        style={styles.hamburgerItem}
                                        onPress={() => toggleDropdown(index)}
                                    >
                                        <Text style={styles.itemText}>{item.name}</Text>
                                        <Image
                                            source={require('../assets/down.png')}
                                            style={styles.dropdownIcon}
                                        />
                                    </TouchableOpacity>
                                    {expandedIndex === index && (
                                        <View style={styles.subBuildingList}>
                                            {item.subBuildings.map((sub, subIndex) => (
                                                <View key={subIndex} style={styles.subBuildingItemContainer}>
                                                    <Text style={styles.subBuildingItem}>
                                                        <Text style={styles.subBuildingBullet}>•</Text> {sub}
                                                    </Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            )}
                        />
                    </View>

                    {/* Fixed Settings Button */}
                    <View style={styles.settingsButtonContainer}>
                        <TouchableOpacity style={styles.settingsButton} onPress={navigateToSettings}>
                            <Image source={require('../assets/gear.png')} style={styles.navIcon} />
                            <Text style={styles.settingsText}>Settings</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapImage: {
        position: 'absolute',
        width: '500%', // Increased width to 500%
        height: '500%', // Increased height to 500%
        top: '-200%', // Adjusted top position
        left: '-200%',
    },
    mapImageContainer: {
        flex: 1,
    },
    mapImageWrapper: {
        flex: 1,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 16,
        padding: 8,
        borderRadius: 25,
        position: 'absolute',
        top: 50,
        left: 10,
        right: 10,
        zIndex: 1,
    },
    searchIcon: {
        marginLeft: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#000',
    },
    bottomNavContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 65,
    },
    navOverlay: {
        position: 'absolute',
        top: -40,
        left: 185,
        width: 110,
        height: 110,
        backgroundColor: '#F5F5DC',
        borderRadius: 100,
        zIndex: 1,
    },
    navIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    avatarContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#EDEDED',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 20,
        zIndex: 2,
    },
    avatar: {
        height: 90,
        width: 90,
        borderRadius: 25,
    },
    mapTypeModal: {
        position: 'absolute',
        bottom: 75,
        left: 13,
        backgroundColor: '#F9F6EE',
        borderRadius: 15,
        padding: 12,
        elevation: 2,
        width: 160,
        height: 170,
    },
    mapTypeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 0,
    },
    mapTypeButton: {
        alignItems: 'center',
        flex: 1,
    },
    mapTypeImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    mapTypeText: {
        fontSize: 13,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'MontserratM',
    },
    hamburgerMenu: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: width * 0.86,
        backgroundColor: '#F7F1E3',
        elevation: 5,
        zIndex: 10,
    },
    hamburgerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#F7F1E3',
    },
    backButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        position: 'absolute',
        top: 50,
        left: 16,
    },
    backButton: {
        width: 25,
        height: 25,
    },
    backButtonText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    hamburgerTitle: {
        fontSize: 25,
        fontFamily: 'Montserrat',
        top: 95,
        left: 50,
    },
    hamburgerContent: {
        top: 75,
        padding: 28,
        flex: 1,
    },
    hamburgerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 18,
        paddingVertical: 10,
        borderRadius: 13,
        borderWidth: 3,
        borderColor: 'rgba(93, 93, 93, 0.4)',
        marginBottom: 10,
        paddingHorizontal: 10,
        fontFamily: 'MontserratSB',
    },
    itemText: {
        fontSize: 16,
        fontFamily: 'MontserratEB',
    },
    dropdownIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    subBuildingList: {
        paddingLeft: 20,
        marginTop: 5,
    },
    subBuildingItem: {
        fontSize: 18,
        fontFamily: 'MontserratSB',
        color: '#000',
        marginBottom: 5,
    },
    settingsButtonContainer: {
        borderTopWidth: 1,
        borderColor: '#000',
        backgroundColor: '#F7F1E3', // Same as menu background
        position: 'absolute', // Keeps it fixed at the bottom
        bottom: 0,
        left: 0,
        width: '100%',
        alignItems: 'center', // Centers the button horizontally
        paddingVertical: 16,
    },
    settingsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centers the content inside the button
    },
    settingsIcon: {
        width: 24,
        height: 24, // Adjust size if needed
        marginRight: 16, // Spacing between icon and text
    },
    settingsText: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        textAlign: 'center', // Ensures the text aligns well
        padding: 2,

    },
    compassModalRight: {
        position: 'absolute',
        bottom: 75,
        right: 13, // Shift to the right side of the screen
        left: undefined, // Remove left alignment
    },

});

export default MapScreen;

