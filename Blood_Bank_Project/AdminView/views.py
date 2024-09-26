from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import date
from Models.views import *
from django.db import transaction
import logging
logger = logging.getLogger(__name__)

# Donor Details Crud OPerations
# Retrieves the donor details by ID or all the donor details and count of the donors
@api_view(['GET'])
def getDonorDetails(request, donar_id=None):
    if AdminValidated(request):
        if donar_id is not None:
            try:
                location = DonarDetails.objects.get(donar_id=donar_id)
                serializer = DonarSerializer(location) 
                print(serializer) 
                logger.info(f"DonarDetails with ID {donar_id} retrieved.") 
                return Response(serializer.data)
            except DonarDetails.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            qs = DonarDetails.objects.all()
            serializer = DonarSerializer(qs, many=True)
            logger.info("Present Day Donors")
            return Response(serializer.data)
        
#create a new donor detail and update the total units of the given blood group in blood bank
@api_view(['POST'])
def createDonorDetails(request):
    blod = request.data.get('blood_type')
    loc = request.data.get('bank')

    blood_obj = BloodGroup.objects.filter(blood_group_type=blod).first()
    blood_serializer = BloodGroupSerializer(blood_obj)
    request.data['blood_type'] = blood_serializer.data

    loct_obj = Location.objects.filter(area=loc).first()
    location_serializer = LocationSerializer(loct_obj)
    request.data['location'] = location_serializer.data

    bank_obj = BloodBank.objects.filter(location=loct_obj).first()
    request.data['bank'] = bank_obj


    serializer = DonarSerializer(data=request.data)
   

    if serializer.is_valid():
        print(serializer.data.get('blood_type'))
        with transaction.atomic():
            donor = serializer.save()
            total = TotalUnits.objects.filter(blood_type=donor.blood_type, blood_bank_id=donor.bank.id).first()
            if total is not None:
                total.total_units += donor.units
                total.save()
            else:
                TotalUnits.objects.create(
                    blood_type=donor.blood_type,
                    blood_bank=donor.bank,
                    total_units=donor.units
                )
            logger.info("Donor created successfully.")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    logger.error("Failed to create Donor.")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update the donor details by using ID
@api_view(['PUT'])
def updateDonorDetails(request, donar_id):
    if AdminValidated(request):
        try:
            donor = DonarDetails.objects.get(donar_id=donar_id)
            serializer = DonarSerializer(donor, data=request.data)
            if serializer.is_valid():
                serializer.save()
                logger.info(f"Updated DonarDetails with ID: {donar_id}")
                return Response(serializer.data)
            logger.error(f"Failed to update DonarDetails with ID: {donar_id}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except DonarDetails.DoesNotExist:
            logger.error(f"DonarDetails with ID {donar_id} does not exist.")
            return Response(status=status.HTTP_404_NOT_FOUND)

# Delete the Donor Details by ID
@api_view(['DELETE'])
def deleteDonorDetails(request, donar_id):
    if AdminValidated(request):
        try:
            donor = DonarDetails.objects.get(donar_id=donar_id)
            donor.delete()
            logger.info(f"Deleted DonarDetails with ID: {donar_id}")
            return Response(status=status.HTTP_204_NO_CONTENT)
        except DonarDetails.DoesNotExist:
            logger.error(f"DonarDetails with ID {donar_id} does not exist.")
            return Response(status=status.HTTP_404_NOT_FOUND)

# Retrieve the current day donors
@api_view(['GET'])
def currentDayDonorDetails(request):
    if AdminValidated(request):
        try:
            current_date = date.today()
            donor_details = DonarDetails.objects.filter(transfusion_date=current_date)
            serializer = DonarSerializer(donor_details, many=True)
            logger.info("Present Day Donors")
            return Response(serializer.data)
        except:
            logger.error(f"No Donors Today!!.")
            return Response(status=status.HTTP_404_NOT_FOUND)
        


# @api_view(['GET'])
# def totalBlood(request):
#     if AdminValidated(request):

        
# @api_view(['GET'])
# def getBloodGroupWithTotalUnits(request, location_id=None):
#     if AdminValidated(request):
#         blood_groups = BloodGroup.objects.all()
#         blood_group_units = {}
#         if location_id is not None:
#             try:
#                 banks = BloodBank.objects.filter(location_id=location_id)
#                 totalBigunits = TotalUnits.objects.filter(blood_bank__in=banks)
#                 serializer = TotalUnitsSerializer(totalBigunits,many = True)
#                 for blood_group in blood_groups:
#                     bloodtype = totalBigunits.filter(blood_type=blood_group)
#                     total_units = bloodtype.aggregate(total=Sum('total_units'))['total'] or 0
#                     blood_group_units[blood_group.blood_group_type] = total_units
#                 logger.info("Blood Group With Units")
#                 return Response(serializer.data)
#             except BloodBank.DoesNotExist:
#                 logger.error("Blood Group Does not exist")
#                 return Response(status=status.HTTP_404_NOT_FOUND)
#         else:
#             logger.error("No Units")
#             return Response("No Such data")
