/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Banknote, Briefcase, CalendarSearch, DownloadCloud, MapPin } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { branches } from '@/data/branches'
import OptedStudents from './OptedStudents'

const JobDetail = ({ job }) => {
  return (
    <div className='space-y-6'>
      {/* Basic overview of details */}
      <Card className="w-full">
        <CardHeader className="flex flex-row justify-between">
          <div className="space-y-2">
            <img src="https://www.forgerock.com/sites/default/files/dam-assets/accenture-partner-tp-logo.png"
              className="h-16 w-16 rounded-full border border-gray-200" />
            <CardTitle>{job?.companyName || "Accenture"}</CardTitle>
            <CardDescription>{job?.roles?.join(",") || "Associate Software Engineer, AASE"}</CardDescription>
          </div>
          <div className='flex flex-col space-y-3'>
            <Badge variant={'secondary'} className={"text-white"}>{job?.appliedStatus || "Not Applied"}</Badge>
            <Button>Opt-in</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <MapPin size={20} className="text-primary" />
            <p>{job?.jobLocation || "Pan India"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Briefcase size={20} className="text-primary" />
            <p className="flex-1">{job?.category?.join(",") || "Internship, Full Time, Internship + Full Time"}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Banknote size={20} className="text-primary" />
            <p className="text-lg font-medium"><span>&#8377;</span>{job?.salary || "4,00,000 to 8,00,000"} <span className="text-xs">LPA</span></p>
          </div>
          <div className="space-x-2">
            {
              ["MERN", "GCP", "Linux", "AWS", "DEVOPS"].map((skill, index) => {
                return (
                  <Badge key={index}>{skill}</Badge>
                )
              })
            }
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <CalendarSearch size={20} className="text-primary" />
            <div>
              <p className="font-semibold">{job?.lastDate || "29-02-2024"}</p>
              <p className="text-xs font-medium">Last Date</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarSearch size={20} className="text-primary" />
            <div>
              <p className="font-semibold">{job?.lastDate || "12-02-2024"}</p>
              <p className="text-xs font-medium">Posted Date</p>
            </div>
          </div>
        </CardFooter>
      </Card>
      {/* Drive Description */}
      <Card>
        <CardHeader>
          <CardTitle>{"Drive Description"}</CardTitle>
          <CardDescription>Find more details about the drive below</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-4'>
            <Label>Eligible Branches</Label>
            <div className='space-x-2'>
              {
                branches.map((branch, index) => {
                  return (
                    <Badge key={index} variant={"outline"}>{branch}</Badge>
                  )
                })
              }
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Related files */}
      <Card>
        <CardHeader>
          <CardTitle>Attached Documents</CardTitle>
          <CardDescription>Download the files below and go through them carefully</CardDescription>
        </CardHeader>
        <CardContent className="flex space-x-5">
          {
            Array.from({ length: 4 }).map((item, index) => {
              return (
                <div key={index} className='border border-primary p-2 rounded-md'>
                  <img src='https://data.unhcr.org/images/documents/big_441d7f43ead31df601a2dc864f5d8ec564d2e7ae.jpg' className='h-36 w-40' />
                  <div className='ml-4 space-y-2'>
                    <p>{"Job Description"}</p>
                    <Button variant="outline" className="space-x-2">
                      <DownloadCloud size={20} />
                      <p>Download</p>
                    </Button>
                  </div>
                </div>
              )
            })
          }
        </CardContent>
      </Card>
      {/* Opted students - only for admin */}
      <Card>
        <CardHeader>
          <CardTitle>Details of Opted Students</CardTitle>
          <CardDescription>Below are the students who have shown interest in the job drive</CardDescription>
        </CardHeader>
        <CardContent>
          <OptedStudents job={job} />
        </CardContent>
      </Card>
    </div>
  )
}

export default JobDetail